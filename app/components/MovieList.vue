<template>
	<appbar></appbar>

	<div class="container" v-if="movies.length">
		<div class="row">
			<div class="card" v-for="movie in movies">
	      <img id="{{$index}}" class="card-img-top" v-on:click="toggleDetails" v-bind:src="movie.medium_cover_image" />
	      <div class="card-block">
	        <h6 class="card-title" data-toggle="tooltip" data-placement="bottom"
							title="{{movie.title}}">{{ movie.title }}
					</h6>
	        <p class="card-text"><small class="text-muted">{{movie.genres}}</small></p>
	        <p class="card-text"><small class="text-muted">{{movie.runtime}} min</small></p>
	      </div>
	    </div>
		</div>
	</div>

	<div v-if="movies.length">
		<button class="btn btn-primary  center-block" v-on:click="loadMore">
			Load more
		</button>
	</div>

	<loading v-if="!movies.length"></loading>

	<router-view></router-view>
</template>

<script>
import DataService from '../services/movies';
let service = new DataService();

export default {
	components: {
		loading: require('./Loading.vue'),
		appbar: require('./AppBar.vue')
	},
	data () {
		return {
			movies: [],
			page: 1,
			sort: 'date_added',
			query: '',
			popoverOpened: false
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this

			self.$set('page', self.page + 1)
			service.getMovies(self).then(function(response) {
				for (let movie of response.data.movies) {
					self.movies.push(movie)
				}
			})
		},
		toggleDetails: function(e) {
			const that = this
			const index = e.target.id

			const popoverWidth = 346
			const location = e.clientX
			const width = $('body')[0].offsetWidth

 			let placement = (width - location) < popoverWidth ? 'left' : 'right'

			$('img').popover('dispose')
			if(that.popoverOpened) {
				that.$set('popoverOpened', false)
				return
			}

			let movie = that.movies[index]
			let content = ['<p class="description">'+ movie.synopsis +'</p>',
				'<p class="director"><strong>Director: </strong>' + movie.directors.join(', ') + '</p>',
				'<p class="stars"><strong>Stars: </strong>' + movie.cast.join(', ') + '</p>',
				'<a class="btn btn-success">Play</div>',].join('')

			$(e.target).popover({
				title: movie.title,
				content: content,
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
			that.$set('popoverOpened', true)
		}
	},
	events: {
		// This event is dispatched from child (appbar). It tells to refresh the list
		// with a new sorting. It also sets the page to one.
    'change-sort': function (sort) {
			const self = this

			self.$set('sort', sort)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
    },
		'search-query': function(query) {
			const self = this

			self.$set('query', query)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
		}
  },
	// ready inits movies array with result from resource service which calls
	// the api
	ready: function() {
		const self = this
		service.getMovies(self).then(function(response) {
			self.$set('movies', response.data.movies)
		});
  }
}
</script>
