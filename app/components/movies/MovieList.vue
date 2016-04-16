<template>
	<div id="main-content">
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
import DataService from '../../services/movies';
let service = new DataService();
import MovieItem from './MovieItem.vue'

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
		toggleDetails: function(e) {
			const that = this
			const index = e.target.id

			const popoverWidth = 346
			const location = e.clientX
			const width = $('body')[0].offsetWidth

 			let placement = (width - location) < popoverWidth + 150 ? 'left' : 'right'

			$('img').popover('dispose')
			if(that.popoverOpened) {
				that.$set('popoverOpened', false)
				return
			}

			$(e.target).popover({
				title: that.movies[index].title,
				content: $('#popover-details-' + that.movies[index].id).html(),
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
			that.$set('popoverOpened', true)
		}
	},

  route: {
    data ({ to }) {
			const self = this
			self.$set('movies', [])
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
