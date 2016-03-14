<template>
	<section id="movie-details" v-show="show" class="animated" transition="fade">
		<div id="movie-header">
			<h1 class="title"> {{movie.title}} </h1>
			<a class="close" v-link="{ name: 'movieList', query: {sort_by: sort} }">
				<i class="fa fa-times"></i>
			</a>
		</div>
		<div id="movie-body"></div>
	</section>
</template>

<script>
import DataService from '../services/movies';
let service = new DataService();

export default {
	data () {
		return {
			show: false,
			movie: {},
			sort: this.$route.query.sort_by
		}
	},
	ready () {
		const that = this
		const id = that.$route.params.id
		service.getMovie(that, id).then(function(response) {
			that.$set('show', true)
		  that.$set('movie', response.data)
		});
  }
}
</script>
