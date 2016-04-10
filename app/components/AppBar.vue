<template>
	<nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
		<button class="navbar-toggler pull-xs-left" type="button" v-on:click="toggleMenu"}>
      &#9776;
    </button>

    <a class="navbar-brand" href="#">Streamer</a>

		<form class="form-inline pull-xs-right">
			<div class="form-group">
				<input v-model="searchQuery" v-on:keyup.enter="search" type="text"
					class="form-control search-control" placeholder="Movie Title, Actor Name, ImDB codes">
			</div>
		</form>

		<div class="btn-group pull-xs-right sort-control">
		  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ sort }}
		  </button>
		  <div class="dropdown-menu dropdown-menu-right">
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
		toggleMenu: function() {
			$('#wrapper').toggleClass('side-menu-open');
		},
		// Update label + dispatch event to parent: MovieList
    updateSort: function(value, text) {
			this.$dispatch('change-sort', value)
			this.$set('sort', text)
    },
		search: function(e){
			e.preventDefault()
			this.$dispatch('search-query', this.searchQuery)
		}
  },
	data () {
		return {
			sort: 'Latest',
			searchQuery: '',
			sorting: [
				{ value: 'date_added', text: 'Latest' },
				{ value: 'like_count', text: 'Most popular' },
				{ value: 'rating', text: 'Top rated' }
			]
		}
	}
}
</script>
