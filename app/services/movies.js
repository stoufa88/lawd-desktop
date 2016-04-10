const MOVIES	=	'http://yify.is/api/v2/list_movies.json'
const MOVIE_DETAILS	=	'http://yify.is/api/v2/movie_details.json?with_cast=true&movie_id='

export default class DataService {
  getMovies (context, options) {
		const pageParam = '?page=' + context.page
		const sortParam = '&sort_by=' + options.sort
		const queryParam = '&query_term=' + options.query

		console.log(sortParam)

		return context.$http({url: MOVIES + pageParam + sortParam + queryParam, method: 'GET' }).then(function (response) {
			return response.data
		})
  }

	getMovie (context, id) {
		return context.$http({url: MOVIE_DETAILS + id, method: 'GET' }).then(function (response) {
			return response.data
		})
	}

	getSub (context, imdbId, torrent) {
		const srt2vtt = require('srt2vtt')
		var OS = require('opensubtitles-api')
		var path = require('path')

		var OpenSubtitles = new OS({
	    useragent:'OSTestUserAgent',
	    ssl: true
		})

		return OpenSubtitles.search({
			sublanguageid: 'fre',
			extensions: ['srt', 'vtt'],
			imdbid: imdbId,
		}).then(function (subtitles) {
				console.log(torrent.path)
				//let srtPath = torrent.path + '/' + f.path
				console.log(subtitles)
				context.$http({url: subtitles.fr.url, method: 'GET' }).then(function (response) {
					console.log(response)
					return response.data
				})
		});




	}
}
