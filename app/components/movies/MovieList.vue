<template>
	<div id="main-content" @click="escape" v-on:keyup.27="escape">
		<div id="movie-list" :class="{ 'container-fluid': true, loading: !movies.length }">
			<div class="row">
				<movie v-for="movie in movies"
							:movie="movie"
							:index="$index">
				</movie>
			</div>

		<div v-if="movies.length">
			<button class="btn btn-primary center-block" v-on:click="loadMore">
				Load more
			</button>
		</div>
	</div>

</template>

<script>
import DataService from '../../services/movies'
import MovieItem from './MovieItem.vue'

let service = new DataService()

export default {
	components: {
		'movie': MovieItem,
	},
	data () {
		return {
			movies: [],
			page: 1,
			sort: 'download_count',
			query: ''
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this
			self.$set('page', self.page + 1)

			let options = {
				sort: self.sort,
				query: self.query,
				page: self.page
			}

			service.getMovies(self, options).then(function(response) {
				for (let movie of response.data.movies) {
					self.movies.push(movie)
				}
			})
		},

		escape: function() {
			if($('.popover').length > 0) {
				$('img').popover('dispose')
			}
		}
	},

  route: {
    data ({ to }) {
			const self = this
			self.$set('movies', [])

			console.log(this.$route)

			let options = {
				sort: to.query.sort_by || self.sort,
				query: to.query.query || ''
			}

			self.$set('sort', options.sort)
			self.$set('query', options.query)

			service.getMovies(self, options).then(function(response) {
				self.$set('movies', response.data.movies)
			});
    }
  },
	events: {
		'search-query': function(query) {
			const self = this

			self.$set('query', query)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
		}
  }
}
</script>
