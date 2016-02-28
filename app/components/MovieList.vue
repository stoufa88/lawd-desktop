<template>
	<section id="movies-section" class="container-fluid hidden">
		<ul v-if="!isLoading" class="movie-list list-inline">
			<li class="movie" v-for="movie in movies">
				<a v-link="{ name: 'movieDetails', params: { id: movie.id }}">
					<div class="poster">
						<img v-bind:src="movie.small_cover_image" />
					</div>
				</a>
			</li>
		</ul>
		
		<div class="load-more" v-if="!isLoading" v-on:click="loadMore">Load More</div>
	</section>

	<loading v-if="isLoading"></loading>

	<router-view></router-view>
</template>

<script>
import DataService from '../services/movies';
let service = new DataService();

export default {
	components: {
		loading: require('./Loading.vue')
	},
	data () {
		return {
			movies: [],
			page: 1,
			isLoading: true
		}
	},
	methods: {
    loadMore: function(event) {
			const that = this
			that.$set('page', that.page + 1)
			service.getMovies(that, that.page).then(function(response) {
				for (let movie of response.data.movies) {
					that.movies.push(movie)
					that.$set('isLoading', false)
				}
			});
    }
  },
	ready () {
		const that = this
		service.getMovies(that, 1).then(function(response) {
		  that.$set('movies', response.data.movies)
			that.$set('isLoading', false)
		});
  }
}
</script>

<style lang="stylus">
.movie-list li
		display: inline-flex
		padding: 5px
		cursor: pointer
	.poster img
			width: 100px
			height: 150px
</style>
