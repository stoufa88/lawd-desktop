// Vendor dependencies

require('./node_modules/bootstrap/dist/js/bootstrap.min.js')
require('./stylesheets/main.scss')

// main.js

var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.transition('fade', {
  enterClass: 'slideInRight',
  leaveClass: 'slideOutRight'
})

var App = Vue.extend({
	components: {
   'appbar': require('./components/AppBar.vue')
 	}
})

var router = new VueRouter()

router.map({
  '/': {
		name: 'movieList',
    component: require('./components/MovieList.vue'),
		subRoutes: {
			'/:id': {
				name: 'movieDetails',
				component: require('./components/MovieDetails.vue')
			}
		}
  }
})

router.start(App, '#app')
