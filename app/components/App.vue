<template>
  <div id="wrapper">

		<div v-if="$route.name == 'movieList'">
			<appbar></appbar>
			<div id="side-menu">
				<sidenav></sidenav>
			</div>

      <nav class="navbar navbar-fixed-bottom">
        <button type="button" class="btn btn-sm btn-transparent" data-toggle="modal" data-target="#infosModal">
          Infos
        </button>
      </nav>

      <infos></infos>
		</div>

    <!-- main view -->
    <router-view></router-view>

  </div>
</template>

<script>

export default {
	components: {
		appbar: require('./AppBar.vue'),
		sidenav: require('./SideNav.vue'),
    infos: require('./Infos.vue')
	},
  data () {
		return {
			showInfos: false,
    }
  },
  methods: {
    handleShowInfos: function() {
      this.$set('showInfos', true)
    }
  },
	events: {
		// This event is dispatched from child (appbar). It tells to refresh the list
		// with a new sorting. It also sets the page to one.
    'change-sort': function (sort) {
			this.$dispatch('apply-sort', sort)
    }
  }
}
</script>
