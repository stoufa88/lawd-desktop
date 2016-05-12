<template>
  <div id="toggle-me" class="invisible">
		<a v-link="{ name: 'movieList', params: { page: 1 }}">Exit</a>
		<p>{{ downloaded }} / {{ total }} </p>
		<p>{{ downloadSpeed }}</p>
	</div>

	<div id="player">
		<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered">
		</video>
	</div>
</template>

<script>
import DataService from '../../services/movies'
import SubtitlesServices from '../../services/subs'
import Engine from '../../services/engine'

let movieService = new DataService()

const filesize = require('filesize')
const videojs = require('video.js')
const path = require('path')

let trackers = [
	'udp://tracker.publicbt.com:80/announce',
	'udp://glotorrents.pw:6969/announce',
  'udp://tracker.coppersurfer.tk:6969/announce',
 	'udp://tracker.openbittorrent.com:80/announce',
	'udp://tracker.opentrackr.org:1337/announce'
]

let player

export default {

	data () {
		return {
			movie: {},
      torrent: {},
      downloaded: 0,
      downloadSpeed: 0,
      total: 0
		}
	},

	methods: {
    donwloadInfosInit () {
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

      setInterval(() =>{
        self.$set('downloaded', filesize(self.torrent.downloaded))
        self.$set('downloadSpeed', filesize(self.torrent.downloadSpeed) + ' /s')
      }, 1000)
    },

		_init() {
      if('.popover') {
        $('.popover').remove()
      }
			player = videojs('video-player', { 'controls': true, 'autoplay': false, 'preload': 'auto' })
		},

    addSubtitle(lang, path) {
      console.info('New subtitle is added', lang)
      let label = lang == 'en' ? 'English' : 'Français'
      $('#video-player_html5_api').append(
        `<track kind="captions" srclang=''${lang} label=${label} src=${path}>`
      )

      // TODO use player.addRemoteTextTrack()
    }

	},

	ready () {
		const self = this
		const id = self.$route.params.id
		const hash = self.$route.params.hash

		self._init()

		movieService.getMovieFromParse(id).then(function(movie) {
			let magnetUri = 'magnet:?xt=urn:btih:' + hash
			magnetUri += '&dn=' + encodeURI(movie.get('torrents')[0].name)
			trackers.forEach(function(t) {
				magnetUri += '&tr=' + t
			})

      // Start torrent download and streaming
      let engine = new Engine()
      engine.addMagnet(magnetUri, ((torrent, mediaIndex, mediaType) => {
        console.info('Player: media type is', mediaType)

        if(mediaType == 'mp4') {
          torrent.files[mediaIndex].renderTo('video')
        }else if(mediaType == 'mkv') {
          $('#video-player_html5_api').attr(
            'src',
            'http://localhost:25111/0'
          )
        }

        self.$set('torrent', torrent)
        self.$set('total', filesize(self.torrent.files[mediaIndex].length))
        self.donwloadInfosInit()

        // Call the subs service and add the available subs.
        let subsService = new SubtitlesServices()
        subsService.getSubtitles(movie.get('imdbID')).then(function(subs) {
          for(const lang in subs) {
            let sub = subs[lang]
            let dir = path.join(torrent.path)
            subsService.saveSubData(sub, dir, function(vttPath) {
              self.addSubtitle(lang, encodeURI(vttPath))
            })
          }
        })
      }))

  	})
	},

	beforeDestroy() {
		videojs('video-player').dispose()
    this.torrent.destroy(() => console.info('Torrent destroyed.'))
	}
}
</script>
