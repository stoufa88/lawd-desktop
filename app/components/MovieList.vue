<template>
	<appbar></appbar>
	<section id="movies-section" v-if="movies.length">
		<ul class="movie-list">
			<li class="movie" v-for="movie in movies">
				<a v-link="{ name: 'movieDetails', params: { id: movie.id }}">
					<div class="poster">
						<img v-bind:src="movie.medium_cover_image" />
					</div>
				</a>
			</li>
		</ul>

		<div class="centered">
			<button class="btn btn-default" v-on:click="loadMore">
				Load more
			</button>
		</div>
	</section>

	<loading v-if="!movies.length"></loading>

	<router-view></router-view>
</template>

<script>
import DataService from '../services/movies';
let service = new DataService();

export default {
	components: {
		loading: require('./Loading.vue'),
		appbar: require('./AppBar.vue')
	},
	data () {
		return {
			movies: [],
			page: 1,
			sort: 'date_added'
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this

			self.$set('page', self.page + 1)
			service.getMovies(self).then(function(response) {
				for (let movie of response.data.movies) {
					self.movies.push(movie)
				}
			});
		}
	},
	events: {
		// This event is dispatched from child (appbar). It tells to refresh the list
		// with a new sorting. It also sets the page to one.
    'change-sort': function (sort) {
			const self = this

			self.$set('sort', sort)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
    }
  },
	// ready inits movies array with result from resource service which calls
	// the api
	ready: function() {
		const self = this

		service.getMovies(self).then(function(response) {
			self.$set('movies', response.data.movies)
		});
  }
}
</script>
