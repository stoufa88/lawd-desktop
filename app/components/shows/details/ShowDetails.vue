<template>
  <div id="main-content" class="movie" v-if="show">
    <header class="movie-header">
      <h1 class="text-xs-center">{{ show.get("name") }}</h1>
      <p class="text-xs-center">{{ show.get("genre") }}</p>

      <button type="button" class="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </header>

    <section class="movie-body">
      <div class="row">
        <div class="movie-left-section col-xs-2">
          <img v-bind:src="show.get('poster')" tabindex="0" />
        </div>

        <div class="movie-center-section col-xs-6">
          <p class="movie-description">{{ show.get('plot') }}</p>

          <h6>Actors</h6>
          <p>{{ show.get("actors") }}</p>

          <h6>Director</h6>
          <p>{{ show.get("director") }}</p>
        </div>

        <div class="movie-right-section col-xs-2">
          <h3>Details</h3>
          <p>Runtime: {{ show.get("runtime") }}</p>
          <p>Country: {{ show.get("country") }}</p>
          <p>Release Date: {{ releaseDate }}</p>
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
      show: null
		}
	},
  ready () {
    const self = this
    const id = self.$route.params.id
    const type = self.$route.params.type === 'movies' ? 'Movie' : 'TV'

    console.log(type, id)

    parseService.getShowFromParse(id, type).then(function(show) {
      console.log(show)
      self.$set('show', show)
    })

  },
  computed: {
    releaseDate: function() {
      return this.moment(this.show.get('released')).format('YYYY/MM/DD')
    }
  }
}
</script>
