import Parse from 'parse/node'

const MOVIES_PARSE_ENDPOINT = 'http://149.202.45.9/parse/hammamet/classes/Movie'

Parse.initialize('88c22318aaeda928f5a9748884203f6b6c1a6d46');
Parse.serverURL = 'http://149.202.45.9/parse/streaming'

export default class DataService {

  // options are sort, skip and query
  getMoviesFromParse (options) {
    var Movie = Parse.Object.extend('Movie');
    var mainQuery = new Parse.Query(Movie);
    mainQuery.limit(options.show)
    mainQuery.skip(options.skip)
    mainQuery.exists('plot')
    mainQuery.notEqualTo('poster', 'N/A')

    console.log(options)

    if(options.searchQuery) {
      var queryEqualName = new Parse.Query(Movie)
      queryEqualName.contains('nameLowCase', (options.searchQuery).toLowerCase())

      var queryContainActors = new Parse.Query(Movie)
      queryContainActors.contains('actors', options.searchQuery)

      var queryEqualID = new Parse.Query(Movie)
      queryEqualID.equalTo('imdbID', options.searchQuery)

      mainQuery = Parse.Query.or(queryEqualName, queryContainActors, queryEqualID)

      return mainQuery.find().then(function(results) {
        return results
      });
    } else {
      if(options.sort == 'popular') {
        mainQuery.descending('released')
        mainQuery.greaterThan('imdbVotes', 100)
      }

      if(options.sort == 'imdbRating') {
        mainQuery.descending('imdbRating')
      }

      if(options.filter !== '') {
        mainQuery.contains('genre', (options.filter).capitalizeFirstLetter())
      }

      return mainQuery.find().then(function(results) {
        return results
      });
    }
  }

  getMovieFromParse(id) {
    var Movie = Parse.Object.extend('Movie')
    var query = new Parse.Query(Movie)

    return query.get(id).then(function(result) {
      return result
    })
  }

  getCuratedListFromParse() {
    var CuratedList = Parse.Object.extend('CuratedList')
    var query = new Parse.Query(CuratedList)
    query.include("movies")

    return query.find().then(function(results) {
      return results
    });
  }
}
