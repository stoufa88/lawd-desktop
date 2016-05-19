<template>
  <div id="main-content">
    <div v-if="lists" :class="{ 'curated-list': true, 'container-fluid': true, loading: !lists.length > 0 }">
      <curated-list-item v-for="list in lists"
            :list="list">
      </curated-list-item>
    </div>
 </div>

</template>

<script>
import DataService from '../../../services/movies'
import CuratedListItem from './CuratedListItem.vue'

let service = new DataService()

export default {
	components: {
		'curatedListItem': CuratedListItem,
	},
	data () {
		return {
			lists: []
		}
	},
  route: {
    data ({ to }) {
			const self = this

			service.getCuratedListFromParse().then(function(results){
				self.$set('lists', results)
			})
    }
  },
}
</script>
