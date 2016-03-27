<template>
	<nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
    <a class="navbar-brand" href="#">Streamer</a>

		<div class="btn-group pull-xs-right">
		  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ sort }}
		  </button>
		  <div class="dropdown-menu">
				<a class="dropdown-item" href="#"
					 v-for="sort in sorting"
					 v-on:click="updateSort(sort.value, sort.text)">
					{{ sort.text }}
				</a>
		  </div>
		</div>
	</nav>
</template>

<script>
export default {
	methods: {
		// Update label + dispatch event to parent: MovieList
    updateSort: function(value, text) {
			this.$dispatch('change-sort', value)
			this.$set('sort', text)
    }
  },
	data () {
		return {
			sort: 'Latest',
			sorting: [
				{ value: 'date_added', text: 'Latest' },
				{ value: 'like_count', text: 'Most popular' },
				{ value: 'rating', text: 'Top rated' }
			]
		}
	}
}
</script>
