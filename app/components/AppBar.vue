<template>
	<nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
		<!-- <button class="navbar-toggler pull-xs-left" type="button" v-on:click="toggleMenu"}>
      &#9776;
    </button> -->

    <a class="navbar-brand" href="#">tlatach</a>

		<form class="form-inline pull-xs-right" v-on:submit="search">
			<div class="form-group">
				<input v-model="searchQuery" type="text"
					class="form-control search-control" placeholder="{{ $t('movies.search') }}">
			</div>
		</form>

		<div class="btn-group pull-xs-right sort-control">
		  <button type="button" class="btn btn-sm btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ sort }}
		  </button>
		  <div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item"
					:href="'#/movies/1' + '?sort_by=' + sort.value"
					@click="updateSort(sort.text)"
					 v-for="sort in sorting">
					{{ sort.text }}
				</a>
		  </div>
		</div>
	</nav>
</template>

<script>
export default {
	methods: {
		getMessage: function (key) {
      return this.$t(key)
    },
		toggleMenu: function() {
			$('#wrapper').toggleClass('side-menu-open');
		},
		search: function(e){
			e.preventDefault()
			this.$route.router.go({
				name: 'movieList',
				query: {
					query: this.searchQuery,
					sort: this.$route.query.sort
				},
				params: {
					page: 1
				}
			})
		},
		updateSort: function( text) {
			this.$set('sort', text)
    }
  },
	data () {
		return {
			sort: this.getMessage('movies.popular'),
			searchQuery: '',
			sorting: [
				{ value: 'download_count', text: this.getMessage('movies.popular') },
				{ value: 'date_added', text: this.getMessage('movies.latest') },
				{ value: 'rating', text: this.getMessage('movies.top_rated') }
			]
		}
	}
}
</script>
