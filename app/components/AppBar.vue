<template>
	<nav class="navbar navbar-fixed-top navbar-dark bg-inverse">
		<!-- <button class="navbar-toggler pull-xs-left" type="button" v-on:click="toggleMenu"}>
      &#9776;
    </button> -->

    <a class="navbar-brand">lawd</a>

		<form class="form-inline pull-xs-right" v-on:submit="search">
			<div class="form-group">
				<input v-model="searchQuery" type="text"
					class="form-control search-control" placeholder="{{ $t('movies.search') }}">
			</div>
		</form>

		<div class="btn-group pull-xs-right sort-control">
		  <button type="button" class="btn btn-sm btn-transparent dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ filter }}
		  </button>
		  <div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item"
					:href="'#/movies' + '?filter=' + filter.value"
					@click="updateFilter(filter.text)"
					 v-for="filter in filters">
					{{ filter.text }}
				</a>
		  </div>
		</div>

		<div class="btn-group pull-xs-right sort-control">
		  <button type="button" class="btn btn-sm btn-transparent dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ sort }}
		  </button>
		  <div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item"
					:href="'#/movies' + '?sort_by=' + sort.value"
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
					searchQuery: this.searchQuery,
					sort: this.$route.query.sort
				},
				params: {
					skip: 0
				}
			})
		},
		updateSort: function(text) {
			this.$set('sort', text)
    },
		updateFilter: function(text) {
			this.$set('filter', text)
		}
  },
	data () {
		return {
			sort: this.getMessage('movies.popular'),
			filter: this.getMessage('movies.genres.all'),
			searchQuery: '',
			sorting: [
				{ value: 'popular', text: this.getMessage('movies.popular') },
				{ value: 'imdbRating', text: this.getMessage('movies.top_rated') }
			],
			filters: [
				{ value: '', text: this.getMessage('movies.genres.all') },
				{ value: 'action', text: this.getMessage('movies.genres.action') },
				{ value: 'adventure', text: this.getMessage('movies.genres.adventure') },
				{ value: 'animation', text: this.getMessage('movies.genres.animation') },
				{ value: 'biography', text: this.getMessage('movies.genres.biography') },
				{ value: 'comedy', text: this.getMessage('movies.genres.comedy') },
				{ value: 'crime', text: this.getMessage('movies.genres.crime') },
				{ value: 'documentary', text: this.getMessage('movies.genres.documentary') },
				{ value: 'drama', text: this.getMessage('movies.genres.drama') },
				{ value: 'family', text: this.getMessage('movies.genres.family') },
				{ value: 'fantasy', text: this.getMessage('movies.genres.fantasy') },
				{ value: 'filmnoir', text: this.getMessage('movies.genres.filmnoir') },
				{ value: 'history', text: this.getMessage('movies.genres.history') },
				{ value: 'horror', text: this.getMessage('movies.genres.horror') },
				{ value: 'music', text: this.getMessage('movies.genres.music') },
				{ value: 'musical', text: this.getMessage('movies.genres.musical') },
				{ value: 'mystery', text: this.getMessage('movies.genres.mystery') },
				{ value: 'romance', text: this.getMessage('movies.genres.romance') },
				{ value: 'scienfiction', text: this.getMessage('movies.genres.scienfiction') },
				{ value: 'sport', text: this.getMessage('movies.genres.sport') },
				{ value: 'thriller', text: this.getMessage('movies.genres.thriller') },
				{ value: 'war', text: this.getMessage('movies.genres.war') },
				{ value: 'western', text: this.getMessage('movies.genres.western') }
			]
		}
	}
}
</script>
