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

      <span>
        <a class="show-link small"
          v-link="{ name: 'player', params: { type: type, id: showId, hash: torrent.info_hash }}">
        {{ showLinkName }}
        </a>
      </span>

  </li>
</template>

<script>
export default {
  props: {
    torrent: Object,
    type: String,
    showId: String,
    showLinkName: String,
    index: Number,
  },

  created () {
    this.filesize = require('filesize')
  },

}
</script>
