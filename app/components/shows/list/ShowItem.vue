<template>
  <div class="card">
    <div class="card-top">
      <img id="{{index}}" class="card-img-top" @click="toggleDetails"
            v-bind:src="show.get('poster')" tabindex="0" />
      <div class="rating">
        <h3>{{ show.get('imdbRating') }}</h3>
        <p> / 10</p>
      </div>
    </div>

    <div class="card-block">
      <h6 class="card-title" data-toggle="tooltip" data-placement="bottom"
          title="{{show.get('name')}}">{{ show.get('name') }}
      </h6>
      <p class="card-text">{{ show.get('actors') }}</p>
      <p class="card-text"><small>{{ show.get('genre') }}</small></p>
      <p class="card-text">
        <small class="pull-xs-left">{{ releaseDate }}</small>
        <small class="pull-xs-right">{{ show.get('runtime') }}</small>
      </p>
    </div>

    <div id="popover-details-{{show.id}}" v-show="false">
      <p class="description">{{ show.get('plot') }}</p>

      <a class="btn btn-primary"
          v-link="{ name: 'showDetails', params: { type: $route.params.type, id: show.id }}">
        Details
      </a>
    </div>
   </div>
</template>

<script>

export default {
  props: {
    show: Object,
    index: Number,
  },
  created () {
    this.moment = require('moment')
  },
	data () {
		return {
			popoverOpened: false
		}
	},
  computed: {
    releaseDate: function() {
      return this.moment(this.show.get('released')).format('YYYY/MM/DD')
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
				title: this.show.get('name'),
				content: $('#popover-details-' + this.show.id).html(),
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
		}
	}
}
</script>
