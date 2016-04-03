<template>
	<h1>Hello<h1>
  <loading></loading>

  <div id="infos">
  	<p>{{ downloaded }} / {{ total }}</p>
  	<p>{{ downloadSpeed }}</p>
  </div>

	<div id="player" class="hidden">
		<video class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay preload="auto" data-setup="{}">

			<track kind="captions" srclang="en" label="English" default>

			</video>
	</div>
</template>

<script>
import DataService from '../services/movies';
let service = new DataService();

export default {
	data () {
		return {
			movie: {}
		}
	},
	ready () {
		const that = this
		console.log('jjjjd')
		const id = that.$route.params.id
		service.getMovie(that, id).then(function(response) {
			console.log(response)
		  that.$set('movie', response.data)
		});
  }
}
</script>
