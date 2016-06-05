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
import DataService from '../../services/parse'
import store from '../../store/store'
import nokat from '../../i18n/nokat.js'
import ShowItem from './ShowItem.vue'

let service = new DataService()

export default {
	components: {
		'show': ShowItem,
	},
	data () {
		return {
			shows: [],
			skip: store.state.skip,
			show: store.state.show,
			filter: store.state.filter,
			sort: store.state.sort,
			searchQuery: store.state.searchQuery,
			type: store.type,
			hasMore: true
		}
	},
	methods: {
		// Load more by updating the page property in vm data instance, then call
		// movies service and concat the new array.
		// XXX: Here we loop the array, should we concat?
		loadMore: function() {
			const self = this

			store.loadMore()

			service.getShowsFromParse(store.state).then(function(results) {
				self.$set('show', results.length)
				if(results.length === 0 ) {
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
			if('.popover') {
				$('.popover').remove()
			}

			const self = this

			let type = to.params.type == 'movies' ? 'Movie': 'TV'
			let sort = to.query.sort != null ? to.query.sort : store.state.sort
			let filter = to.query.filter != null ? to.query.filter : store.state.filter
			let searchQuery = to.query.searchQuery != null ? to.query.searchQuery : store.state.filtsearchQueryer


			// Update store from query params
			store.setType(type)
			store.resetLoad(0)

			store.setSort(sort)
			store.setFilter(filter)
			store.setSearchQuery(searchQuery)


			self.$set('shows', [])
			self.$set('hasMore', true)

			service.getShowsFromParse(store.state).then(function(results){
				if(results.length == 0) {
					self.$set('shows', null)
					return
				}

				if(results.length < self.show) {
					self.$set('hasMore', false)
				}

				self.$set('shows', results)
			})
    }
  },
	beforeDestroy() {
		if('.popover') {
			$('.popover').remove()
		}
	}
}
</script>
