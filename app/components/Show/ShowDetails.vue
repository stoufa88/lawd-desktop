<template>
  <div id="main-content" class="movie" v-if="show">
    <header class="show-header">
      <div id="show-trailer" v-if="trailer">
          <i class="fa fa-play invisible" aria-hidden="true" data-toggle="modal" data-target="#trailer-modal"></i>
        <img v-bind:src="trailer.thumbURL" tabindex="0" />
      </div>

      <div id="show-name">
        <h1 class="text-xs-center">{{ show.get("name") }}</h1>
        <p class="text-xs-center">{{ show.get("genre") }}</p>
      </div>

      <a class="close"
        v-link="{
          name: 'showList',
          params: { type: this.$route.params.type }
        }">
        <span aria-hidden="true">&times;</span>
      </a>
    </header>

    <section class="row movie-body">
      <div class="movie-left-section col-xs-2">
        <img v-bind:src="show.get('poster')" tabindex="0" />
      </div>

      <div class="movie-center-section col-xs-6">
        <div class="row">
          <p class="movie-description lead">{{ show.get('plot') }}</p>

          <p><strong>Actors:</strong></p>
          <p>{{ show.get("actors") }}</p>

          <p><strong>Director: </strong></p>
          <p>{{ show.get("director") }}</p>
        </div>

        <div class="movie-torrents-section">
          <div class="row" v-if="type == 'Movie'">
            <torrent v-for="torrent in show.get('torrents') | filterBy 'p' in 'quality'"
                  :torrent="torrent"
                  :show-id="show.id"
                  :type='"movies"'>
            </torrent>
          </div>

          <div v-if="type == 'TV'">
            <div v-for="episodes in seasons">
              <div class="season-title row">
                <a data-toggle="collapse"
                    :href="'#' + $key"
                    aria-expanded="false" :aria-controls="$key">
                  Saison {{ $key }}
                </a>
              </div>

              <div class="collapse" :id="$key">
                <season :episodes="episodes"></season>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="movie-right-section col-xs-2">
        <h3>Details</h3>
        <p><strong>Runtime:</strong> {{ show.get("runtime") }}</p>
        <p><strong>Country:</strong> {{ show.get("country") }}</p>
        <p><strong>Release Date:</strong> {{ releaseDate }}</p>
      </div>
    </div>

  </section>

  <!-- Modal -->
  <div v-if="trailer" class="modal fade" id="trailer-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <iframe id="ytplayer" type="text/html" width="640" height="390"
          :src="trailer.videoURL"
          frameborder="0">
        </iframe>
      </div>
    </div>
  </div>
</template>

<script>

import DataService from '../../services/parse'
let parseService = new DataService()

export default {
  components: {
    'torrent': require('./Torrent.vue'),
    'season': require('./Season.vue'),
  },
  created () {
    this.moment = require('moment')
  },
	data () {
		return {
      show: null,
      trailer: null,
      seasons: null,
      type: ''
		}
	},
  ready () {
    const self = this
    const id = self.$route.params.id
    const type = self.$route.params.type === 'movies' ? 'Movie' : 'TV'

    parseService.getShowFromParse(id, type).then((show) => {
      self.$set('show', show)
      self.$set('type', type)

      parseService.getTrailerFromYoutube(show.get('name'), (trailer) => {
        self.$set('trailer', trailer)
      })

      if(type === 'TV') {
        parseService.getTVEpisodesFromParse(self.show.id).then((results) => {
          self.$set('seasons', results)
        })
      }
    })
  },
  computed: {
    releaseDate: function() {
      return this.moment(this.show.get('released')).format('YYYY/MM/DD')
    }
  }
}
</script>
