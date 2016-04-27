<template>
  <div class="card">
    <img id="{{index}}" class="card-img-top" @click="toggleDetails"
          v-bind:src="movie.medium_cover_image" tabindex="0"/>
    <div class="card-block">
      <h6 class="card-title" data-toggle="tooltip" data-placement="bottom"
          title="{{movie.title}}">{{ movie.title }}
      </h6>
      <p class="card-text"><small>{{ movie.genres.join(', ') }}</small></p>
      <p class="card-text"><small>{{ movie.runtime }} min</small></p>
    </div>

    <div id="popover-details-{{movie.id}}" v-show="false">
      <p class="description">{{ movie.synopsis }}</p>
      <span class="torrent-links" v-for="torrent in movie.torrents | filterBy 'p' in 'quality'">
        <a class="btn btn-success"
            v-link="{ name: 'player', params: { id: movie.id, hash: torrent.hash }}">
            {{torrent.quality}}</a>
      </div>
    </div>
   </div>
</template>

<script>

export default {
  props: {
    movie: Object,
    index: Number
  },
	data () {
		return {
			popoverOpened: false
		}
	},
	methods: {
		toggleDetails: function(e) {
			const that = this
			const index = e.target.id

			const popoverWidth = 346
			const locationX = e.clientX
			const width = $('body')[0].offsetWidth

 			let placement = (width - locationX) < popoverWidth + 150 ? 'left' : 'right'

			$('img').popover('dispose')
			if(that.popoverOpened) {
				that.$set('popoverOpened', false)
				return
			}

			$(e.target).popover({
				title: that.movie.title,
				content: $('#popover-details-' + that.movie.id).html(),
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
			that.$set('popoverOpened', true)
		}
	}
}
</script>
