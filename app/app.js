// main.js
var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')

Vue.use(VueResource)
Vue.use(VueRouter)

var App = Vue.extend({})

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
