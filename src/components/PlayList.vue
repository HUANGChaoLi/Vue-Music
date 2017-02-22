<template lang="jade">
  #PlayList
    songList(:items="songs", v-if="songs.length > 0", :changePlay="playMusic", :changeLike="updateLike", hasDelete="true", :deleteSong="deleteSong")
    div(v-else)
      .nothing-icon
        md-icon.nothing-icons assignment
      .nothing-text 播放列队暂时空白


</template>

<script>
import Vue from 'Vue'
import storage from '../services/storage.js'
import util from '../services/util.js'
import songList from './songList'

export default {
  name: 'PlayList',
  data () {
    return {
      songs: util.updateAttrFromTo(Vue, storage.getFavoriteSongs(), storage.getPlaySongs(), 'like', false)
    }
  },
  mounted () {
    if (window) {
      let self = this
      window.eventManager.$on('PlayList.changeLike', function () {
        util.updateAttrFromTo(Vue, storage.getFavoriteSongs(), self.songs, 'like', false)
      })
    }
  },
  methods: {
    updateLike (index) {
      if (typeof this.songs[index] !== 'object') return
      this.songs[index].like = !this.songs[index].like
      Vue.set(this.songs, index, this.songs[index])
      if (window) window.eventManager.$emit('Search.changeLike', this.songs[index])
      if (this.songs[index].like) storage.addFavoriteSong(this.songs[index])
      else storage.removeFavoriteSong(this.songs[index])
    },
    playMusic (index) {
      if (window) window.eventManager.$emit('Global.playSong', this.songs[index])
    },
    deleteSong (index) {
      console.log(index)
      this.songs = storage.removePlaySong(this.songs[index])
    }
  },
  components: {
    songList
  }
}
</script>

<style scoped>

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
