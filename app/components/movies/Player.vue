<template>
  <div id="toggle-me" class="invisible">
		<a v-link="{ name: 'movieList'}">Exit</a>
		<p>{{ downloaded }} / {{ total }}</p>
		<p>{{ downloadSpeed }}</p>
	</div>

	<div id="player">
		<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered">
			<track kind="captions" srclang="en" label="English" default>
		</video>
	</div>
</template>

<script>
import DataService from '../../services/movies'
let service = new DataService()

const WebTorrent = require('webtorrent')
const filesize = require('filesize')
const videojs = require('video.js')
const path = require('path')
const fs = require('fs')
const srt2vtt = require('srt2vtt')

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
			let self = this;
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
		},

		_init() {
			$('.popover').remove()
			videojs("video-player", { "controls": true, "autoplay": false, "preload": "auto" });
		}
	},

	ready () {
		const self = this
		const id = self.$route.params.id

		self._init()

		let engine = new WebTorrent()

		service.getMovie(self, id).then(function(response) {
			let movie = response.data
			let torrent = movie.torrents.torrent[0].url
			engine.add(torrent, function (torrent) {
				let movieFile;
				console.log(torrent.infoHash)
				torrent.files.forEach(function (f) {
					if (/\.(mp4|mkv)$/i.test(f.name)) {
						if(!movieFile || f.length > movieFile.length)
							movieFile = f;
					}
				});

				service.getSubData(self, movie.imdb_code).then(function(srtData) {
					srt2vtt(srtData, function(err, vttData) {
						if (err) throw new Error(err)
						let vttPath = path.join(torrent.path, torrent.name, 'sub.vtt')
						fs.writeFileSync(vttPath, vttData)
						$('#video-player track').attr('src', vttPath);
					})
				})

				movieFile.renderTo('video')

				self.$set('total', filesize(movieFile.length))
				setInterval(() => {
					self.$set('downloaded', filesize(torrent.downloaded))
					self.$set('downloadSpeed', filesize(torrent.downloadSpeed) + ' /s')
				}, 1000)

				self.trackInfos()
			})
  	})
	},

	beforeDestroy() {
		videojs('asba').dispose()
	}
}
</script>
