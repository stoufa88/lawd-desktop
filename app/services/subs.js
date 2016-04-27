const path = require('path')
const fs = require('fs')
const srt2vtt = require('srt2vtt')
const OS = require('opensubtitles-api')
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
      return subtitles
		})
	}

  saveSubData(sub, dir, cb) {
    let self = this
    return self.context.$http({url: sub.url, method: 'GET' }).then(function (response) {
      return srt2vtt(response.data, function(err, vttData) {
        if (err) throw new Error(err)
        let filename = 'sub-' + sub.lang
        let vttPath = path.join(dir, filename)
        fs.writeFileSync(vttPath, vttData)
        cb(vttPath)
      })
    })
  }

}
