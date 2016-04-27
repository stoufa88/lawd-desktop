const WebTorrent = require('webtorrent')

let _initCalled = false
let engine
let _torrents = {}

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

      _torrents[torrent.infoHash] = torrent

      let movieFile;
      torrent.files.forEach(function (f) {
        if (/\.(mp4|mkv)$/i.test(f.name)) {
          if(!movieFile || f.length > movieFile.length){
            movieFile = f
          }
        }
      })
      cb(movieFile)
    })
  }

  getTorrents() {
    const array = []

    for (const id in _torrents)
      array.push(_torrents[id])

    return array
  }

  getTorrent(hash) {
    return _torrents[hash.toLowerCase()]
  }

}
