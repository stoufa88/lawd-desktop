<template>
	<section id="movie-details">
		<div id="movie-header">
			<h1 class="title"> {{movie.title}} </h1>
			<a class="close" v-link="{ name: 'movieList' }">
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
			movie: {},
		}
	},
	ready () {
		const that = this
		const id = that.$route.params.id
		service.getMovie(that, id).then(function(response) {
			console.log(response)
		  that.$set('movie', response.data)
		});
  }
}
</script>

<style lang="stylus">
#movie-details
	position: fixed
	top: 0
	z-index: 100
	right: 0
	background: rgba(51, 51, 51, 0.93)
	height: 100%
	width: 75%

	#movie-header
		position: relative
		h1.title
			text-align: center
			text-transform: uppercase
			color: #fff
		a.close
			position: absolute
			right: 25px
			top: 0
			font-size: 25px
			color: #fff

</style>
