<template>
  <ul>
    <li v-for="episode in episodes">
      {{ episode.get("name") }}
      <torrent v-for="torrent in episode.get('torrents')"
            :torrent="torrent"
            :show-id="episode.id"
            :type='"TV"'>
      </torrent>
    </li>
  </ul>
</template>

<script>
export default {
  components: {
    'torrent': require('./Torrent.vue')
  },
  props: {
    episodes: Array
  },

  created () {
    this.filesize = require('filesize')
  },

}
</script>
