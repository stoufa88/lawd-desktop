<template>
  <div id="toggle-me" class="invisible">
		<div id="infos">
  		<p>{{ downloaded }} / {{ total }}</p>
  		<p>{{ downloadSpeed }}</p>
		</div>

		<div id="exit">
			<a v-link="{ name: 'movieList'}">Exit</a></div>
		</div>
	</div>

	<div id="player">
		<video class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay preload="auto" data-setup="{}">
			<track kind="captions" srclang="en" label="English" default>
		</video>
	</div>
</template>

<script>
import DataService from '../../services/movies'
let service = new DataService()

const WebTorrent = require('webtorrent')
const filesize = require('filesize')

const ipcRenderer = require('electron').ipcRenderer

export default {
	data () {
		return {
			movie: {},
			downloaded: 0,
      total: 0,
      downloadSpeed: '0 /s'
		}
	},

	methods: {
		trackInfos () {
			let that = this;
			let exit = false;
			$('#player').mousemove(function(event) {
				if(exit) return
				$('#toggle-me').removeClass('invisible')
				exit = true
				setTimeout(() => {
					$('#toggle-me').addClass('invisible')
					exit = false
				}, 5000)
			});
		}
	},

	ready () {
		const that = this
		const id = that.$route.params.id

		let engine = new WebTorrent()

		service.getMovie(that, id).then(function(response) {
			let movie = response.data
			let torrent = movie.torrents.torrent[0].url
			engine.add(torrent, function (torrent) {
				// Got torrent metadata!
				console.log('Torrent info hash:', torrent.infoHash);
				let movieFile;
				// Select the file to download and load subs to the player
				torrent.files.forEach(function (f) {
					if (/\.(mp4|mkv)$/i.test(f.name)) {
						if(!movieFile || f.length > movieFile.length)
							movieFile = f;
					}
				});
				movieFile.renderTo('video')

				that.$set('total', filesize(movieFile.length))
				setInterval(() => {
					that.$set('downloaded', filesize(torrent.downloaded))
					that.$set('downloadSpeed', filesize(torrent.downloadSpeed) + ' /s')
				}, 1000)

				that.trackInfos()
			})
  	})
	}
}
</script>
