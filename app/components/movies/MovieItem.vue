<template>
  <div class="card">
    <img id="{{index}}" class="card-img-top" @click="toggleDetails"
          v-bind:src="movie.get('poster')" tabindex="0"/>
    <div class="card-block">
      <h6 class="card-title" data-toggle="tooltip" data-placement="bottom"
          title="{{movie.title}}">{{ movie.get('name') }}
      </h6>
      <p class="card-text"><small>{{ movie.get('genre') }}</small></p>
      <p class="card-text">
        <small class="pull-xs-left">{{ releaseDate }}</small>
        <small class="pull-xs-right">{{ movie.get('runtime') }}</small>
      </p>
    </div>

    <div id="popover-details-{{movie.id}}" v-show="false">
      <p class="description">{{ movie.get('plot') }}</p>
      <ul class="torrent-links" v-for="torrent in movie.get('torrents') | filterBy 'p' in 'quality'">
        <li>
          <p>{{torrent.name}}</p>
          <p>{{torrent.language}} / {{torrent.quality}} / {{ filesize(torrent.size) }}</p>
          <a class="btn btn-primary"
              v-link="{ name: 'player', params: { id: movie.id, hash: torrent.info_hash }}">
              Tfaraj {{torrent.quality}}</a>
        </li>
      </ul>
    </div>
   </div>
</template>

<script>

export default {
  props: {
    movie: Object,
    index: Number,
  },
  created () {
    this.filesize = require('filesize')
    this.moment = require('moment')
  },
	data () {
		return {
			popoverOpened: false
		}
	},
  computed: {
    releaseDate: function() {
      return this.moment(this.movie.get('released')).format('YYYY/MM/DD')
    }
  },
	methods: {
		toggleDetails: function(e) {
      if($('.popover').length > 0) {
        e.stopPropagation()
        this.$set('popoverOpened', false)
        $('img').popover('dispose')
        return
      }

			const index = e.target.id

			const popoverWidth = 346
			const locationX = e.clientX
			const width = $('body')[0].offsetWidth

 			let placement = (width - locationX) < popoverWidth + 100 ? 'left' : 'right'

      e.stopPropagation()

			$(e.target).popover({
				title: this.movie.get('name'),
				content: $('#popover-details-' + this.movie.id).html(),
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
		}
	}
}
</script>
