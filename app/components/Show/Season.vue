<template>
  <ul>
    <li v-for="episode in episodes">
      <div class="season-episodes" role="tablist" aria-multiselectable="true">
        <a data-toggle="collapse" data-parent="#accordion" :href="`#S${episode.get('season') + episode.get('episode')}`" aria-expanded="false" :aria-controls="$index">
					<span>Episode {{ episode.get("episode") }}</span>
					<span v-if="episode.get('title')">: {{ episode.get("title")  }}</span>
        </a>
        <div :id="`S${episode.get('season') + episode.get('episode')}`" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne">
          <torrent v-for="torrent in episode.get('torrents')"
                :torrent="torrent"
                :show-id="episode.id"
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
