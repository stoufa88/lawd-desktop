<template>
	<nav class="navbar navbar-default">
	  <div class="container-fluid">
	    <!-- Brand and toggle get grouped for better mobile display -->
	    <div class="navbar-header">
	      <a class="navbar-brand" href="#">Streamer</a>
	    </div>

	    <!-- Collect the nav links, forms, and other content for toggling -->
	    <div class="collapse navbar-collapse">
	      <ul class="nav navbar-nav navbar-right">
	        <li class="dropdown">
	          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ sort }} <span class="caret"></span></a>
	          <ul class="dropdown-menu">
	            <li v-for="sort in sorting">
								<a href="#" v-on:click="updateSort(sort.value, sort.text)">{{ sort.text }}</a>
							</li>
	          </ul>
	        </li>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container-fluid -->
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
