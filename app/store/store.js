var store = {
  state: {
		show: 30,
		skip: 0,
    filter: '',
		sort: 'popular',
		searchQuery: '',
		type: 'Movie'
  },
	loadMore: function () {
		this.state.skip = this.state.show + this.state.skip
	},
	resetLoad: function () {
		this.state.skip = 0
	},
  setFilter: function (filter) {
    this.state.filter = filter
  },
  setSort: function (sort) {
    this.state.sort = sort
  },
  setSearchQuery: function (searchQuery) {
    this.state.searchQuery = searchQuery
  },
	setType: function (type) {
		this.state.type = type
  }
}

export default store
