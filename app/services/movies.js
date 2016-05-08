import Parse from 'parse/node'
import _ from 'underscore'

const MOVIES_PARSE_ENDPOINT = 'http://149.202.45.9/parse/hammamet/classes/Movie'

Parse.initialize('88c22318aaeda928f5a9748884203f6b6c1a6d46');
Parse.serverURL = 'http://149.202.45.9/parse/streaming'

export default class DataService {
  // options are sort, skip and query
  getMoviesFromParse (options) {
    var Movie = Parse.Object.extend('Movie');
    var query = new Parse.Query(Movie);
    query.limit(30)
    query.skip(options.skip)
    query.exists('plot')
    query.notEqualTo('poster', 'N/A')
    query.exists('imdbRating')

    if(options.searchQuery) {
      query.contains('name', options.searchQuery)
    }

    if(options.sort) {
      query.descending(options.sort)
    }

    return query.find().then(function(results) {
      return results
    });
  }

  getMovieFromParse(context, id) {
    return context.$http({
			url: `${MOVIES_PARSE_ENDPOINT}/${id}`,
			method: 'GET'
		}).then(function (response) {
			return response.data
		})
  }
}

let popularRatings = _.map(_.range(7, 10, 0.1), ((v) => {
  return (Math.round( v * 10 ) / 10).toString()
}))
