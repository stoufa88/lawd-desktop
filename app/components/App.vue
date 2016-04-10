<template>
  <div id="wrapper">
		<appbar ></appbar>

		<div id="side-menu">
			<sidenav></sidenav>
		</div>

    <!-- main view -->
		<div id="main-content">
    	<router-view></router-view>
		</div>

  </div>
</template>

<script>

export default {
	components: {
		appbar: require('./AppBar.vue'),
		sidenav: require('./SideNav.vue')
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
