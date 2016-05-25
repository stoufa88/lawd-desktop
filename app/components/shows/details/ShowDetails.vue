<template>
  <div id="main-content" class="movie" v-if="show">
    <header class="movie-header">
      <h1 class="text-xs-center">{{ show.get("name") }}</h1>
      <p class="text-xs-center">{{ show.get("genre") }}</p>

      <a class="close"
        v-link="{
          name: 'showList',
          params: { type: this.$route.params.type }
        }">
        <span aria-hidden="true">&times;</span>
      </a>
    </header>

    <section class="movie-body">
      <div class="row">
        <div class="movie-left-section col-xs-2">
          <img v-bind:src="show.get('poster')" tabindex="0" />
        </div>

        <div class="movie-center-section col-xs-6">
          <p class="movie-description lead">{{ show.get('plot') }}</p>

          <p><strong>Actors</strong></p>
          <p>{{ show.get("actors") }}</p>

          <p><strong>Director</strong></p>
          <p>{{ show.get("director") }}</p>
        </div>

        <div class="movie-right-section col-xs-2">
          <h3>Details</h3>
          <p><strong>Runtime:</strong> {{ show.get("runtime") }}</p>
          <p><strong>Country:</strong> {{ show.get("country") }}</p>
          <p><strong>Release Date:</strong> {{ releaseDate }}</p>
        </div>
      </div>

      <div class="row">
        <div class="movie-torrents-section col-xs-6 col-xs-offset-3" v-if="type == 'Movie'">
          <torrent v-for="torrent in show.get('torrents') | filterBy 'p' in 'quality'"
                :torrent="torrent"
                :show-id="show.id"
                :show-name="show.get('name')"
                :type='"Movie"'>
          </torrent>
        </div>

        <div class="movie-torrents-section col-xs-6 col-xs-offset-3" v-if="type == 'TV'">
          <div v-for="episodes in seasons">
            <a class="btn btn-transparent" data-toggle="collapse"
                :href="'#' + $key"
                aria-expanded="false" :aria-controls="$key">
              {{ $key }}
            </a>

            <div class="collapse" :id="$key">
              <season :episodes="episodes"></season>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import DataService from '../../../services/parse'
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
