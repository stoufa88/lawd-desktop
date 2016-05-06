// Vendor dependencies
require('bootstrap/dist/js/bootstrap.js')

require('./stylesheets/main.scss')

var Vue = require('vue')
var VueResource = require('vue-resource')
var VueRouter = require('vue-router')
var VueI18n = require('vue-i18n')

import App from './components/App.vue'
import MovieList from './components/movies/MovieList.vue'
import Player from './components/movies/Player.vue'
import locales from './i18n/locales.js'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueI18n)

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
	'player/:id/:hash': {
		name: 'player',
		component: Player,
	}
})

router.redirect({
  '*': '/movies/1'
})

router.start(App, '#app')

Vue.config.lang = navigator.language

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
