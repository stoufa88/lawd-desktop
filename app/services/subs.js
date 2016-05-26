const path = require('path')
const http = require('http')
const fs = require('fs')
const srt2vtt = require('srt2vtt')
const OS = require('opensubtitles-api')
const iconv  = require('iconv-lite')
import DataService from './parse'

export default class Subtitles {
  constructor() {
  }

  getSubtitles(imdbid, options) {
    let self = this
		let OpenSubtitles = new OS({
	    useragent: 'streamer',
	    ssl: true
		})

    var query = {
      imdbid: imdbid,
      sublanguageid: 'eng, fre',
      extensions: ['srt', 'vtt']
    }

    if(options.season && options.episode) {
      query.season = options.season
      query.episode = options.episode
    }

		return OpenSubtitles.search(query).then(function (subtitles) {
      console.log('Subs engine got',  subtitles)
      return subtitles
		})
	}

  saveSubData(sub, dir, cb) {
    let self = this

    // Open subs api is broken
    // Remove the .srt the file url to download
    let url = sub.url.slice(0, sub.url.indexOf('.srt'))

    http.get(url, function(res) {
      res.pipe(iconv.decodeStream('win1252')).collect(function(err, decodedBody) {
        srt2vtt(decodedBody, function(err, vttData) {
          if (err) throw new Error(err)

          let filename = 'sub-' + sub.lang + '.vtt'
          let vttPath = path.join(dir, filename)
          fs.writeFileSync(vttPath, vttData)
          cb(vttPath)
        })
      });
    });
  }

}
