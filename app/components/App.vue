<template>
  <div id="wrapper">

		<div v-if="$route.name != 'player'">
			<appbar></appbar>
			<div id="side-menu">
				<sidenav></sidenav>
			</div>
		</div>

    <!-- main view -->
    <router-view></router-view>

    <infos></infos>

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
