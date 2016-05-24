<template>
  <li>
    <p class="torrent-name" v-if="torrent.name">{{ torrent.name }}</p>
    <p class="torrent-lang" v-if="torrent.language"> {{ torrent.language }} </p>
    <p class="torrent-quality" v-if="torrent.quality"> {{ torrent.quality }} </p>
    <p class="torrent-size" v-if="torrent.size"> {{ filesize(torrent.size) }} </p>
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
