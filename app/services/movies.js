const MOVIES	=	'http://yify.is/api/v2/list_movies.json?page='
const MOVIE_DETAILS	=	'http://yify.is/api/v2/movie_details.json?movie_id='

export default class DataService {
  getMovies (context, page) {
    return context.$http({url: MOVIES + page, method: 'GET' }).then(function (response) {
      return response.data
    })
  }

	getMovie (context, id) {
		return context.$http({url: MOVIE_DETAILS + id, method: 'GET' }).then(function (response) {
			return response.data
		})
	}
}
