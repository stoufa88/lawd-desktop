import Parse from 'parse/node'
import _ from 'underscore'
import google from 'googleapis'

Parse.initialize('88c22318aaeda928f5a9748884203f6b6c1a6d46');
Parse.serverURL = 'http://149.202.45.9/parse/streaming'

export default class DataService {

  // options are sort, skip and query
  getShowsFromParse (options) {
    var Show = Parse.Object.extend(options.type);

    console.log(options)

    if(options.searchQuery && options.searchQuery.length > 0) {
      var queryEqualName = new Parse.Query(Show)
      queryEqualName.contains('nameLowCase', (options.searchQuery).toLowerCase())

      var queryContainActors = new Parse.Query(Show)
      queryContainActors.contains('actors', options.searchQuery)

      var queryEqualID = new Parse.Query(Show)
      queryEqualID.equalTo('imdbID', options.searchQuery)

      mainQuery = Parse.Query.or(queryEqualName, queryContainActors, queryEqualID)
			mainQuery = this.buildQuery(mainQuery, options)

      return mainQuery.find().then(function(results) {
        return results
      });
    } else {
			var mainQuery = new Parse.Query(Show)
			mainQuery = this.buildQuery(mainQuery, options)

      return mainQuery.find().then(function(results) {
        return results
      });
    }
  }

	buildQuery(query, options) {
		if(options.sort == 'latest') {
			query.descending('released')
			query.greaterThan('imdbVotes', 100)
		}

		if(options.sort == 'popular') {
			query.descending('released')
			query.greaterThan('imdbRating', 7)
		}

		if(options.sort == 'imdbRating') {
			query.descending('imdbRating')
		}

		if(options.filter !== '') {
			query.contains('genre', (options.filter).capitalizeFirstLetter())
		}

		query.limit(options.show)
		query.skip(options.skip)
		query.exists('plot')
		query.notEqualTo('poster', 'N/A')

		return query
	}

  getTVEpisodesFromParse(id) {
    var tv = new Parse.Object('TV');
    tv.id = id;

    var TVEpisode = Parse.Object.extend('TVEpisode')
    var query = new Parse.Query(TVEpisode)
    query.equalTo('parent', tv)
    query.descending('name')

    return query.find().then(function(results) {
      var groups =  _.groupBy(results, function(r) {
        return r.get('season')
      });
      return groups
    })
  }

  getShowFromParse(id, type) {
    const self = this
    var Show = Parse.Object.extend(type)
    var query = new Parse.Query(Show)
    query.include('parent')

    return query.get(id).then((result) => {
      return result
    })
  }

  getTrailerFromYoutube(query, cb) {
    let youtube = google.youtube({
     version: 'v3',
     auth: 'AIzaSyArYwv1MWaj550MwKSbSju8BW4dLAKWsNk'
    });

		query = query.toLowerCase()

    youtube.search.list({
      part: 'id,snippet',
      q: `${query} trailer`,
      videoCategoryId: '1',
      type: 'video',
      order: 'viewCount'
    }, function (err, data) {
      if (!err && data) {
				let index, i = 0
				while(!index && i < data.items.length) {
					let title = (data.items[i].snippet.title).toLowerCase()
					if(title.indexOf(query) > -1 && title.indexOf('trailer') > -1) {
						index = i
					}

					i++
				}

				if(index) {
					let item = data.items[index]
					let trailer = {
						videoURL: `http://www.youtube.com/embed/${item.id.videoId}`,
						thumbURL: item.snippet.thumbnails['high'].url
					}

					cb(trailer)
				} else {
					cb({
						videoURL: null,
						thumbURL: null
					})
				}


      }
  });


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
