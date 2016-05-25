<template>
	<div id="main-content" @click="escape" v-on:keyup.27="escape">
		<div v-if="shows" :class="{ 'movie-list': true, 'container-fluid': true, loading: !shows.length > 0 }">
			<div class="row">
				<show v-for="show in shows"
							:show="show"
							:index="$index">
				</show>
			</div>

			<div v-if="shows.length > 0 && hasMore">
				<button class="btn btn-secondary center-block" v-on:click="loadMore">
					{{ $t('shows.more') }}
				</button>
			</div>
		</div>

		<div v-if="!shows">
			<p class="text-xs-center text-info">{{ randomEmptyMessage() }}</p>
		</div>
	</div>

</template>

<script>
import DataService from '../../../services/parse'
import nokat from '../../../i18n/nokat.js'
import ShowItem from './ShowItem.vue'

let service = new DataService()

let defaultSort = 'popular'
let defaultFilter = ''
let defaultQuery = ''

export default {
	components: {
		'show': ShowItem,
	},
	data () {
		return {
			shows: [],
			type: '',
			skip: 0,
			show: 30,
			filter: '',
			searchQuery: '',
			hasMore: true
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this
			self.$set('skip', self.skip + self.show)

			let options = {
				sort: self.sort,
				filter: self.filter,
				searchQuery: self.searchQuery,
				skip: self.skip,
				show: self.show,
				type: self.type
			}

			service.getShowsFromParse(options).then(function(results) {
				self.$set('show', results.length)
				if(results.length === 0) {
					self.$set('hasMore', false)
				}

				for (let show of results) {
					self.shows.push(show)
				}
			})
		},

		escape: function() {
			if($('.popover').length > 0) {
				$('img').popover('dispose')
			}
		},
		randomEmptyMessage: function() {
			return nokat[Math.floor(Math.random() * nokat.length)]
		}
	},

  route: {
    data ({ to }) {
			const self = this

			let type = to.params.type == 'movies' ? 'Movie': 'TV'

			let options = {
				sort: to.query.sort || defaultSort,
				filter: to.query.filter || defaultFilter,
				searchQuery: to.query.searchQuery || defaultQuery,
				skip: self.skip,
				show: self.show,
				type: type
			}

			self.$set('shows', [])
			self.$set('skip', 0)
			self.$set('show', 30)
			self.$set('searchQuery', options.searchQuery)
			self.$set('hasMore', true)
			self.$set('type', type)

			service.getShowsFromParse(options).then(function(results){
				self.$set('shows', results)
			})
    }
  },
	events: {
		'search-query': function(searchQuery) {
			const self = this

			self.$set('shows', [])
			self.$set('type', self.type)
			self.$set('searchQuery', searchQuery)
			self.$set('skip', 0)
			self.$set('show', 30)
			self.$set('shows', [])

			let options = {
				sort: to.query.sort || defaultSort,
				filter: to.query.filter || defaultFilter,
				searchQuery: to.query.searchQuery || defaultQuery,
				skip: self.skip,
				show: self.show,
				type: self.type
			}

			service.getShowsFromParse(options).then(function(response) {
				self.$set('shows', response.data.movies)
			});
		}
  },
	beforeDestroy() {
		if('.popover') {
			$('.popover').remove()
		}
	}
}
</script>
