<template lang="jade">
  #Favorite
    songList(:items="songs", v-if="songs.length > 0", :changePlay="playMusic", :changeLike="cancelFavorite")
    div(v-else)
      .nothing-icon
        md-icon.nothing-icons assignment
      .nothing-text 尚无喜欢的音乐


</template>

<script>
import timeFilter from '../filters/Time.js'
import storage from '../services/storage.js'
import songList from './songList'

let headers = ['歌曲', '歌手', '专辑', '时长']

export default {
  name: 'Favorite',
  props: ['changeLike'],
  data () {
    return {
      headers,
      songs: storage.getFavoriteSongs()
    }
  },
  mounted () {
    this.songs = storage.getFavoriteSongs()
    let self = this
    if (window) {
      window.eventManager.$on('changeLike', function () {
        self.songs = storage.getFavoriteSongs()
      })
    }
  },
  methods: {
    cancelFavorite (index) {
      this.songs = storage.removeFavoriteSong(this.songs[index])
    },
    playMusic (index) {
      console.log(index)
    }
  },
  components: {
    songList
  },
  filters: {
    timeFilter
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
