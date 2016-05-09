import Parse from 'parse/node'

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

    if(options.searchQuery) {
      query.contains('name', options.searchQuery)
    }

    if(options.sort) {
      query.descending(options.sort)
    }

    return query.find().then(function(results) {
      results.forEach(function(movie){
        console.log(movie.get('released'))
      })
      return results
    });
  }

  getMovieFromParse(id) {
    var Movie = Parse.Object.extend('Movie');
    var query = new Parse.Query(Movie);

    return query.get(id).then(function(result) {
      return result
    });
  }
}
