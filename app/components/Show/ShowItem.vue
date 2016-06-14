<template>
  <div class="card">
    <div class="card-top">
			<a v-link="{ name: 'showDetails', params: { type: $route.params.type, id: show.id }}">
	      <img id="{{index}}" class="card-img-top" v-bind:src="show.get('poster')" tabindex="0" />
	      <div class="show-back">
					<i class="fa fa-eye" aria-hidden="true"></i>
	      </div>
			</a>
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
  }
}
</script>
