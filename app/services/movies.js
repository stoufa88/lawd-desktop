const MOVIES	=	'http://yify.is/api/v2/list_movies.json'
const MOVIE_DETAILS	=	'http://yify.is/api/v2/movie_details.json?with_cast=true&movie_id='

export default class DataService {
  getMovies (context, options) {
		const pageParam = '?page=' + context.page
		const sortParam = '&sort_by=' + options.sort
		const queryParam = '&query_term=' + options.query

		return context.$http({url: MOVIES + pageParam + sortParam + queryParam, method: 'GET' }).then(function (response) {
			return response.data
		})
  }

	getMovie (context, id) {
		return context.$http({url: MOVIE_DETAILS + id, method: 'GET' }).then(function (response) {
			return response.data
		})
	}
}
