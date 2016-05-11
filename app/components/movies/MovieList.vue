<template>
	<div id="main-content" @click="escape" v-on:keyup.27="escape">
		<div id="movie-list" v-if="movies" :class="{ 'container-fluid': true, loading: !movies.length }">
			<div class="row">
				<movie v-for="movie in movies"
							:movie="movie"
							:index="$index">
				</movie>
			</div>

			<div v-if="movies.length">
				<button class="btn btn-primary center-block" v-on:click="loadMore">
					{{ $t('movies.more') }}
				</button>
			</div>
		</div>

		<div v-if="!movies">
			<p class="text-xs-center text-info">{{ randomEmptyMessage() }}</p>
		</div>
	</div>

</template>

<script>
import DataService from '../../services/movies'
import MovieItem from './MovieItem.vue'
import nokat from '../../i18n/nokat.js'

let service = new DataService()

export default {
	components: {
		'movie': MovieItem,
	},
	data () {
		return {
			movies: [],
			skip: 0,
			sort: 'popular',
			searchQuery: ''
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this
			self.$set('skip', self.skip + 10)

			let options = {
				sort: self.sort,
				query: self.searchQuery,
				skip: self.skip
			}

			service.getMoviesFromParse(options).then(function(results) {
				for (let movie of results) {
					self.movies.push(movie)
				}
			})
		},

		escape: function() {
			if($('.popover').length > 0) {
				$('img').popover('dispose')
			}
		},
		randomEmptyMessage: function() {
			return nokat[Math.floor(Math.random() * nokat.length)]
		}
	},

  route: {
    data ({ to }) {
			const self = this
			self.$set('movies', [])

			let options = {
				sort: to.query.sort_by || self.sort,
				searchQuery: to.query.searchQuery || '',
				skip: 0
			}

			self.$set('sort', options.sort)
			self.$set('searchQuery', options.searchQuery)

			service.getMoviesFromParse(options).then(function(results){
				self.$set('movies', results)
			})
    }
  },
	events: {
		'search-query': function(searchQuery) {
			const self = this

			self.$set('searchQuery', searchQuery)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
		}
  }
}
</script>
