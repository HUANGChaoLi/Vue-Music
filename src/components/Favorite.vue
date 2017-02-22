<template lang="jade">
  #Favorite
    songList(:items="songs", v-if="songs.length > 0", :changePlay="playMusic", :changeLike="cancelFavorite")
    div(v-else)
      .nothing-icon
        md-icon.nothing-icons assignment
      .nothing-text 尚无喜欢的音乐


</template>

<script>
import storage from '../services/storage.js'
import songList from './songList'

export default {
  name: 'Favorite',
  data () {
    return {
      songs: storage.getFavoriteSongs()
    }
  },
  mounted () {
    if (window) {
      let self = this
      window.eventManager.$on('Search.changeLike', function () {
        self.songs = storage.getFavoriteSongs()
      })
    }
  },
  methods: {
    cancelFavorite (index) {
      this.songs = storage.removeFavoriteSong(this.songs[index])
      if (window) window.eventManager.$emit('Favorite.changeLike')
    },
    playMusic (index) {
      console.log(index)
    }
  },
  components: {
    songList
  }
}
</script>

<style scoped>
.songname {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.favorite-icon {
  font-size: 22px;
}

.nothing-icon {
  height: 200px;
  line-height: 200px;
  margin-top: 100px;
  margin-right: 180px;
  color: rgba(0, 0, 0, .5);
}
.nothing-icon .nothing-icons {
  font-size: 200px;
  vertical-align: baseline;
}

.nothing-text {
  font-size: 1.5em;
}

</style>
