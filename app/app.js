// Vendor dependencies
require('./node_modules/bootstrap/dist/css/bootstrap.min.css')
require('./node_modules/font-awesome/css/font-awesome.css')
require('./node_modules/spinkit/css/spinners/5-pulse.css')
require('./node_modules/bootstrap/dist/js/bootstrap.min.js')

// main.js

var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')

Vue.use(VueResource)
Vue.use(VueRouter)

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
