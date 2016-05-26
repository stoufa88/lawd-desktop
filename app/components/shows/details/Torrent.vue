<template>
  <li>
    <span class="torrent-language">
      <img class="flag"
        src="https://lipis.github.io/flag-icon-css/flags/1x1/fr.svg"
        v-if="torrent.language == 'fr'"
      />

      <img class="flag"
        src="https://lipis.github.io/flag-icon-css/flags/1x1/gb.svg"
        v-if="torrent.language == 'en'"
      />
    </span>

    <span class="torrent-name">
      <span class="torrent-name" v-if="showName">{{ showName }}</span>
    </span>

    <span>
      Torrent {{ index + 1}} : {{ torrent.quality }}
      <a class="btn btn-primary"
          v-link="{ name: 'player', params: { type: type, id: showId, hash: torrent.info_hash }}">
          Tfaraj</a>
    </span>
  </li>
</template>

<script>
export default {
  props: {
    torrent: Object,
    type: String,
    showId: String,
    showName: String,
    index: Number,
  },

  created () {
    this.filesize = require('filesize')
  },

}
</script>
