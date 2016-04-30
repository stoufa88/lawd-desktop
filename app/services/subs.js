const path = require('path')
const http = require('http')
const fs = require('fs')
const srt2vtt = require('srt2vtt')
const OS = require('opensubtitles-api')
const iconv  = require('iconv-lite')
import DataService from './movies'

export default class Subtitles {
  constructor(context) {
    this.context = context
  }

  getSubtitles(imdbId) {
    let self = this
		let OpenSubtitles = new OS({
	    useragent:'streamer',
	    ssl: true
		})

		return OpenSubtitles.search({
			sublanguageid: 'eng, fre',
			extensions: ['srt', 'vtt'],
			imdbid: imdbId,
		}).then(function (subtitles) {
      console.log(subtitles)
      return subtitles
		})
	}

  saveSubData(sub, dir, cb) {
    let self = this

    http.get(sub.url, function(res) {
      res.pipe(iconv.decodeStream('win1252')).collect(function(err, decodedBody) {
        srt2vtt(decodedBody, function(err, vttData) {
          if (err) throw new Error(err)

          let filename = 'sub-' + sub.lang + 'vtt'
          let vttPath = path.join(dir, filename)
          fs.writeFileSync(vttPath, vttData)
          cb(vttPath)
        })
      });
    });
  }

}
