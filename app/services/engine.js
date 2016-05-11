const WebTorrent = require('webtorrent')

let _initCalled = false
let engine
let _torrents = {}
let server

export default class Engine {
  constructor() {
    if(_initCalled)
      return

    _initCalled = true
    engine = new WebTorrent()
  }

  // Add torrent to engine, return movie file in callback
  addMagnet(magnetUri, cb) {
    engine.add(magnetUri, function (torrent) {
      console.log('new torrent added to engine', torrent.infoHash)

      server = torrent.createServer()
      server.listen('25111')

      let movieFile
      let mediaIndex = 0
      torrent.files.forEach(function (f, index) {
        f.select()

        if (/\.(mp4|mkv)$/i.test(f.name)) {
          if(!movieFile || f.length > movieFile.length){
            movieFile = f
            mediaIndex = index
          }
        }
      })
      let mediaType = movieFile.name.indexOf('mkv') > -1 ? 'mkv' : 'mp4'
      cb(torrent, mediaIndex, mediaType)
    })
  }

  destroyServer() {
    server.close()
  }

  getTorrents() {
    const array = []

    for (const id in _torrents)
      array.push(_torrents[id])

    return array
  }

}
