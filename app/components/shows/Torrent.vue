<template>
  <li>
    <p>{{ torrent.name }}</p>
    <p>{{ torrent.language }} / {{ torrent.quality }} / {{ filesize(torrent.size) }}</p>
    <a class="btn btn-primary"
        v-link="{ name: 'player', params: { type: type, id: showId, hash: torrent.info_hash }}">
        Tfaraj {{torrent.quality}}</a>
  </li>
</template>

<script>
export default {
  props: {
    torrent: Object,
    type: String,
    showId: String,
    index: Number,
  },

  created () {
    this.filesize = require('filesize')
  },

}
</script>
