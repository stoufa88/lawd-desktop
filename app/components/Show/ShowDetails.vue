<template>
		<div class="movie">
			<div v-if="show && trailer" transition="fade">
		    <header :class="{ 'show-header': true, 'has-trailer': trailer && trailer.videoURL}">
		      <div id="show-trailer" tabindex="0" aria-hidden="true"
								data-toggle="modal" data-target="#trailer-modal"
								v-if="trailer">
		          <i class="fa fa-play invisible"></i>
		        <img v-bind:src="trailer.thumbURL" />
		      </div>

		      <div id="show-name">
		        <h1 class="text-xs-center display-5">{{ show.get("name") }}</h1>
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

		      <div class="movie-center-section col-xs-5">
		        <div class="row">
		          <p class="movie-description">{{ show.get('plot') }}</p>

							<div class="col-xs-12">
			          <strong>{{ $t('shows.actors') }}:</strong>
			          <p>{{ show.get("actors") }}</p>
							</div>

							<div class="col-xs-12">
			          <strong>{{ $t('shows.director') }}: </strong>
			          <p>{{ show.get("director") }}</p>
							</div>
		        </div>

						<div class="row">
							<h1>{{ $t('shows.watch') }}</h1>
						</div>

		        <div class="row movie-torrents-section">
		          <ul v-if="type == 'Movie'">
		            <torrent v-for="torrent in show.get('torrents') | filterBy 'p' in 'quality'"
		                  :torrent="torrent"
		                  :show-id="show.id"
		                  :movie-torrent-link="torrent.name"
		                  :type='"movies"'>
		            </torrent>
		          </ul>

		          <div v-if="type == 'TV'">
		            <div v-for="episodes in seasons">
		              <div class="season-title">
		                <a data-toggle="collapse"
		                    :href="'#S' + $key"
		                    aria-expanded="false" :aria-controls="$key">
		                  Saison {{ $key }}
		                </a>
		              </div>

		              <div class="collapse" :id="'S' + $key">
		                <season :episodes="episodes"></season>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>

		      <div class="movie-right-section col-xs-2 col-xs-offset-1">
		        <h3>{{ $t('shows.details') }}</h3>
						<p><strong>{{ $t('shows.rating') }}:</strong> {{  show.get("imdbRating") }}</p>
		        <p><strong>{{ $t('shows.runtime') }}:</strong> {{ show.get("runtime") }}</p>
		        <p><strong>{{ $t('shows.country') }}:</strong> {{ show.get("country") }}</p>
		        <p><strong>{{ $t('shows.release_date') }}:</strong> {{ releaseDate }}</p>
		      </div>
		    </div>

		  </section>
			<div v-else="!show" class="loading"></div>
		</div>
  <!-- Modal -->
  <div v-if="trailer && trailer.videoURL" class="modal fade" id="trailer-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
      self.$set('type', type)
      self.$set('show', show)

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
