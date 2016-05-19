<template>
  <h3>{{ list.get('name') }}</h3>
  <div class="container-fluid movie-list">
    <div class="row">
      <movie v-for="movie in list.get('movies')"
            :movie="movie"
            :index="$index">
      </movie>
    </div>
  </div>
</template>

<script>

import MovieItem from '../MovieItem.vue'
import DataService from '../../../services/movies'

let service = new DataService()

export default {
  components: {
    'movie': MovieItem,
  },
  props: {
    list: Object
  }
}
</script>
