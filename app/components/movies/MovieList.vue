<template>
	<div id="main-content">
		<div id="movie-list" :class="{ 'container': true, loading: !movies.length }">
			<div class="row">
				<div class="card" v-for="movie in movies">
		      <img id="{{$index}}" class="card-img-top" @click="toggleDetails" v-bind:src="movie.medium_cover_image" />
		      <div class="card-block">
		        <h6 class="card-title" data-toggle="tooltip" data-placement="bottom"
								title="{{movie.title}}">{{ movie.title }}
						</h6>
		        <p class="card-text"><small class="text-muted">{{ movie.genres }}</small></p>
		        <p class="card-text"><small class="text-muted">{{ movie.runtime }} min</small></p>
		      </div>

					<div id="popover-details-{{movie.id}}" v-show="false">
						<p class="description">{{ movie.synopsis }}</p>
						<p class="director"><strong>Director: </strong>{{ movie.directors.join(', ') }}</p>
						<p class="stars"><strong>Stars: </strong>{{ movie.cast.join(', ') }}</p>
						<a class="btn btn-success" v-link="{ name: 'player', params: { id: movie.id }}">Play</a>
					</div>
		    </div>
			</div>
		</div>

		<div v-if="movies.length">
			<button class="btn btn-primary  center-block" v-on:click="loadMore">
				Load more
			</button>
		</div>
	</div>

</template>

<script>
import DataService from '../../services/movies';
let service = new DataService();

export default {
	data () {
		return {
			movies: [],
			page: 1,
			sort: 'like_count',
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

			let options = {
				sort: self.sort,
				query: self.query,
				page: self.page
			}

			service.getMovies(self, options).then(function(response) {
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

			$(e.target).popover({
				title: that.movies[index].title,
				content: $('#popover-details-' + that.movies[index].id).html(),
				html: true,
				placement: placement
			})

			$(e.target).popover('show')
			that.$set('popoverOpened', true)
		}
	},

  route: {
    data ({ to }) {
			const self = this
			self.$set('movies', [])
			let options = {
				sort: to.query.sort_by || 'data_added',
				query: to.query.query || ''
			}

			self.$set('sort', options.sort)
			self.$set('query', options.query)

			service.getMovies(self, options).then(function(response) {
				self.$set('movies', response.data.movies)
			});
    }
  },
	events: {
		'search-query': function(query) {
			const self = this

			self.$set('query', query)
			self.$set('page', 1)
			self.$set('movies', [])
			service.getMovies(self).then(function(response) {
				self.$set('movies', response.data.movies)
			});
		}
  }
}
</script>
