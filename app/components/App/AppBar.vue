<template>
	<nav :class="{ 'navbar': true, 'navbar-dark bg-inverse': true, 'navbar-fixed-top': true,
	 							'disable-controls': $route.name == 'showDetails' 
							 }">
		<button class="navbar-toggler pull-xs-left" type="button" v-on:click="toggleMenu"}>
      &#9776;
    </button>

    <a class="navbar-brand">lawd</a>

		<form class="form-inline pull-xs-right" v-on:submit="search">
			<div class="form-group">
				<input v-model="searchQuery" type="text"
					class="form-control search-control" placeholder="{{ $t('shows.search') }}">
			</div>
		</form>

		<div class="btn-group pull-xs-right sort-control">
		  <button type="button" class="btn btn-sm btn-transparent dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		    {{ filter }}
		  </button>
		  <div class="dropdown-menu dropdown-menu-right">
				<a class="dropdown-item"
					v-link="{ name: 'showList', params: { type: this.$route.params.type }, query: {filter: filter.value}}"
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
					v-link="{ name: 'showList', params: { type: this.$route.params.type }, query: {sort: sort.value}}"
					@click="updateSort(sort.text)"
					 v-for="sort in sorting">
					{{ sort.text }}
				</a>
		  </div>
		</div>
	</nav>
</template>

<script>
// :href="routePath + '?sort_by=' + sort.value"

export default {
	methods: {
		getMessage: function (key) {
      return this.$t(key)
    },
		toggleMenu: function() {
			$('#wrapper').toggleClass('side-menu-open')
		},
		search: function(e){
			e.preventDefault()
			this.$route.router.go({
				name: 'showList',
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
			sort: this.getMessage('shows.popular'),
			filter: this.getMessage('shows.genres.all'),
			searchQuery: '',
			sorting: [
				{ value: 'popular', text: this.getMessage('shows.popular') },
				{ value: 'imdbRating', text: this.getMessage('shows.top_rated') }
			],
			filters: [
				{ value: '', text: this.getMessage('shows.genres.all') },
				{ value: 'action', text: this.getMessage('shows.genres.action') },
				{ value: 'adventure', text: this.getMessage('shows.genres.adventure') },
				{ value: 'animation', text: this.getMessage('shows.genres.animation') },
				{ value: 'biography', text: this.getMessage('shows.genres.biography') },
				{ value: 'comedy', text: this.getMessage('shows.genres.comedy') },
				{ value: 'crime', text: this.getMessage('shows.genres.crime') },
				{ value: 'documentary', text: this.getMessage('shows.genres.documentary') },
				{ value: 'drama', text: this.getMessage('shows.genres.drama') },
				{ value: 'family', text: this.getMessage('shows.genres.family') },
				{ value: 'fantasy', text: this.getMessage('shows.genres.fantasy') },
				{ value: 'filmnoir', text: this.getMessage('shows.genres.filmnoir') },
				{ value: 'history', text: this.getMessage('shows.genres.history') },
				{ value: 'horror', text: this.getMessage('shows.genres.horror') },
				{ value: 'music', text: this.getMessage('shows.genres.music') },
				{ value: 'musical', text: this.getMessage('shows.genres.musical') },
				{ value: 'mystery', text: this.getMessage('shows.genres.mystery') },
				{ value: 'romance', text: this.getMessage('shows.genres.romance') },
				{ value: 'scienfiction', text: this.getMessage('shows.genres.scienfiction') },
				{ value: 'sport', text: this.getMessage('shows.genres.sport') },
				{ value: 'thriller', text: this.getMessage('shows.genres.thriller') },
				{ value: 'war', text: this.getMessage('shows.genres.war') },
				{ value: 'western', text: this.getMessage('shows.genres.western') }
			]
		}
	}
}
</script>
