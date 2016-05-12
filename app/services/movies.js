import Parse from 'parse/node'

const MOVIES_PARSE_ENDPOINT = 'http://149.202.45.9/parse/hammamet/classes/Movie'

Parse.initialize('88c22318aaeda928f5a9748884203f6b6c1a6d46');
Parse.serverURL = 'http://149.202.45.9/parse/streaming'

export default class DataService {

  // options are sort, skip and query
  getMoviesFromParse (options) {
    var Movie = Parse.Object.extend('Movie');
    var query = new Parse.Query(Movie);
    query.limit(options.show)
    query.skip(options.skip)
    query.exists('plot')
    query.notEqualTo('poster', 'N/A')

    if(options.searchQuery) {
      query.contains('name', options.searchQuery)
    } else {
      if(options.sort == 'popular') {
        query.descending('released')
        query.greaterThan('imdbVotes', 100)
      }

      if(options.sort == 'imdbRating') {
        query.descending('imdbRating')
      }
    }

    return query.find().then(function(results) {
      console.log(results.length)
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
