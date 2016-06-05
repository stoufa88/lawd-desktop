<template>
  <div id="toggle-me" class="invisible row" v-if="show">
    <div class="col-xs-2">
			<p>{{ show.get("name") }}</p>
    </div>

    <div class="col-xs-3 col-xs-offset-1">
      <p>{{ downloaded }} / {{ total }} </p>
    </div>

    <div class="col-xs-2 col-xs-offset-1">
			<p><i class="fa fa-arrow-down" aria-hidden="true"></i>{{ downloadSpeed }}</p>
    </div>

    <div class="col-xs-2">
			<p><i class="fa fa-arrow-up" aria-hidden="true"></i>{{ uploadSpeed }}</p>
    </div>

    <div class="pull-xs-right">
			<a class="close"
				v-link="{ name: 'showList', params: { type: this.$route.params.type }}">
        <span aria-hidden="true">&times;</span>
      </a>
    </div>

	</div>

	<div id="player">
		<video id="video-player" class="video-js vjs-default-skin vjs-big-play-centered">
		</video>
	</div>
</template>

<script>
import DataService from '../../services/parse'
import SubtitlesServices from '../../services/subs'
import Engine from '../../services/engine'

let parseService = new DataService()

const filesize = require('filesize')
const videojs = require('video.js')
const path = require('path')

let trackers = [
	'udp://tracker.publicbt.com:80/announce',
	'udp://glotorrents.pw:6969/announce',
  'udp://tracker.coppersurfer.tk:6969/announce',
 	'udp://tracker.openbittorrent.com:80/announce',
	'udp://tracker.opentrackr.org:1337/announce',
  'http://tracker.calculate.ru:6969/announce',
  'http://tracker1.wasabii.com.tw:6969/announce',
  'http://thetracker.org/announce',
  'http://tracker.files.fm:6969/announce',
  'http://tracker1.itzmx.com:8080/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'http://tracker.baravik.org:6970/announce'
]

let player

export default {

	data () {
		return {
			show: null,
      season: '',
      episode: '',
      torrent: {},
      downloaded: 0,
      downloadSpeed: 0,
      uploadSpeed: 0,
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
        self.$set('uploadSpeed', filesize(self.torrent.uploadSpeed) + ' /s')
      }, 1000)
    },

		_init() {
			player = videojs('video-player', { 'controls': true, 'autoplay': false, 'preload': 'auto' })
		},

    addSubtitle(lang, path) {
      console.info('New subtitle is added', lang)

      player.addRemoteTextTrack({
				kind: 'subtitles',
				language: lang,
				src: path
			})
    }

	},

	ready () {
		const self = this
		const id = self.$route.params.id
		const hash = self.$route.params.hash
		const type = self.$route.params.type === 'movies' ? 'Movie' : 'TVEpisode'

		self._init()

		parseService.getShowFromParse(id, type).then(function(show) {
      if(type == 'TVEpisode') {
        self.$set('season', show.get('season'))
        self.$set('episode', show.get('episode'))
        self.$set('show', show.get('parent'))
      }else {
        self.$set('show', show)
      }

			let magnetUri = 'magnet:?xt=urn:btih:' + hash
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
            'http://localhost:25111/' + mediaIndex
          )
        }

        self.$set('torrent', torrent)
        self.$set('total', filesize(self.torrent.files[mediaIndex].length))
        self.donwloadInfosInit()

        // Call the subs service and add the available subs.
        let subsService = new SubtitlesServices()
        let subOptions = {}

        if(self.season && self.episode) {
          subOptions.season = self.season
          subOptions.episode = self.episode
        }

        subsService.getSubtitles(self.show.get('imdbID'), subOptions).then(function(subs) {
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
