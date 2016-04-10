// Vendor dependencies
require('bootstrap/dist/js/bootstrap.js')
require('video.js/dist/video.js')

require('./stylesheets/main.scss')

var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')

import App from './components/App.vue'
import MovieList from './components/movies/MovieList.vue'
import Player from './components/movies/Player.vue'

Vue.use(VueResource)
Vue.use(VueRouter)

Vue.transition('fade', {
  enterClass: 'slideInRight',
  leaveClass: 'slideOutRight'
})

var router = new VueRouter()

router.map({
  '/movies/:page': {
		name: 'movieList',
    component: MovieList
  },
	'player/:id': {
		name: 'player',
		component: Player,
	}
})

router.redirect({
  '*': '/movies/1'
})

router.start(App, '#app')
