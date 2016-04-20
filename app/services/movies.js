const MOVIES	=	'http://yts.ag/api/v2/list_movies.json'
const MOVIE_DETAILS	=	'http://yts.ag/api/v2/movie_details.json?with_cast=true&movie_id='

export default class DataService {
  getMovies (context, options) {
		const pageParam = '?page=' + context.page
		const sortParam = '&sort_by=' + options.sort
		const queryParam = '&query_term=' + options.query

		console.log(sortParam)

		return context.$http({
			url: MOVIES + pageParam + sortParam + queryParam,
			method: 'GET'
		}).then(function (response) {
			return response.data
		})
  }

	getMovie (context, id) {
		return context.$http({
			url: MOVIE_DETAILS + id,
			method: 'GET'
		}).then(function (response) {
			return response.data
		})
	}

	getSubData (context, imdbId) {
		var OS = require('opensubtitles-api')
		var OpenSubtitles = new OS({
	    useragent:'streamer',
	    ssl: true
		})

    console.log(imdbId)

		return OpenSubtitles.search({
			sublanguageid: 'eng, fre',
			extensions: ['srt', 'vtt'],
			imdbid: imdbId,
		}).then(function (subtitles) {
      console.log(subtitles)
			return context.$http({url: subtitles.fr.url, method: 'GET' }).then(function (response) {
				return response.data
			})
		})

	}
}
