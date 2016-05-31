<template>
  <ul>
    <li v-for="episode in episodes">
      <div class="season-episodes" role="tablist" aria-multiselectable="true">
        <a data-toggle="collapse" data-parent="#accordion" :href="`#${episode.get('season') + episode.get('episode')}`" aria-expanded="false" :aria-controls="$index">
          Episode {{ episode.get("episode") }}
        </a>
        <div :id="`${episode.get('season') + episode.get('episode')}`" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
          <torrent v-for="torrent in episode.get('torrents')"
                :torrent="torrent"
                :show-id="episode.id"
								:tv-torrent-link="episode.get('name')"
                :type='"tv"'
                :index="$index">
          </torrent>
        </div>
        </div>
      </div>
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
