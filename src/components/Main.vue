<template lang="jade">
  div
    md-bottom-bar.nav-bar
      md-bottom-bar-item(md-icon="music_note", @click.native="go('Play')", md-active) Music
      md-bottom-bar-item(md-icon="queue_music", @click.native="go('PlayList')") PlayList
      md-bottom-bar-item(md-icon="favorite", @click.native="go('Favorite')") Favorite
      md-bottom-bar-item(md-icon="search", @click.native="openSearchSidenav") Search
    transition(name="bounce", mode="out-in")
      router-view.content
    audio#player(ref="player", :src="playingSong.src")
    md-bottom-bar.music-control-container
      md-bottom-bar-item(md-icon="first_page", @click.native="show") 上一首
      md-bottom-bar-item(:md-icon="play ? 'pause' : 'play_arrow'", @click.native="playOrPause") {{play ? '暂停' : '播放'}}
      md-bottom-bar-item(md-icon="last_page") 下一首
      md-bottom-bar-item(md-icon="favorite_border") 喜欢
      md-bottom-bar-item(md-icon="volume_up") {{songTime | timeFilter}}
    .play-process-container
      .play-process(:style="{width: processRatio + '%'}")
    md-dialog-alert(:md-content="'查询失败，请检查网络状况'", :md-ok-text="'ok'", ref="alert")
    md-sidenav.md-left(ref="searchSidenav")
      md-toolbar.search-bar
        md-button.md-icon-button(@click.native="search")
          md-icon search
        md-input-container.search-input(md-inline)
          label Search Song
          md-input(v-model="keyword")
      md-progress.search-process(md-indeterminate, v-if="searchNow")
      sideList.search-list(:items="songs", :changeLike="updateLike", :changePlay="updatePlay")
</template>

<script>
import Vue from 'Vue'
import router from '../router/index.js'
import sideList from './sideList'
import timeFilter from '../filters/Time.js'
import Resource from '../services/resource.js'
import storage from '../services/storage.js'
import util from '../services/util.js'

export default {
  name: 'Main',
  data () {
    return {
      songs: [],
      keyword: '',
      searchNow: false,
      songTime: 0,
      play: false,
      currentTime: 0,
      timer: null,
      playingSong: {}
    }
  },
  mounted () {
    if (window) {
      let self = this
      window.eventManager.$on('Search.changeLike', function (song) {
        util.updateAttrByHash(Vue, song.hash, self.songs, 'like', song.like)
      })
      // 全局播放接口
      window.eventManager.$on('Global.playSong', function (newSong) {
        if (self.play && newSong.hash === self.playingSong.hash) return
        if (self.play) self.playOrPause()
        Resource.searchUrlByHash(self.$http, newSong.hash, function (err, url) {
          if (err) {
            self.$refs.alert.open()
          } else {
            self.playingSong = newSong
            self.playingSong.src = url
            self.playReset()
            setTimeout(self.playOrPause, 200)
          }
        })
      })
    }
  },
  methods: {
    playReset () {
      this.play = false
      this.currentTime = 0
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    go (state) {
      router.push({name: state})
    },
    openSearchSidenav () {
      this.$refs.searchSidenav.toggle()
    },
    search () {
      let self = this
      self.searchNow = true
      Resource.searchByKeyword(this.$http, this.keyword, function (err, data) {
        self.searchNow = false
        if (err) self.$refs.alert.open()
        else self.songs = data
        util.updateAttrFromTo(Vue, storage.getFavoriteSongs(), self.songs, 'like', false)
      })
    },
    updateLike (index) {
      if (typeof this.songs[index] !== 'object') return
      this.songs[index].like = !this.songs[index].like
      Vue.set(this.songs, index, this.songs[index])
      if (this.songs[index].like) storage.addFavoriteSong(this.songs[index])
      else storage.removeFavoriteSong(this.songs[index])
      if (window) {
        window.eventManager.$emit('Favorite.changeLike')
        window.eventManager.$emit('PlayList.changeLike')
      }
    },
    updatePlay (index) {
      storage.addPlaySong(this.songs[index])
      if (window) window.eventManager.$emit('Global.playSong', this.songs[index])
    },
    playOrPause () {
      this.songTime = this.$refs.player.duration
      if (!this.songTime) this.songTime = 1
      let player = this.$refs.player
      this.play = !this.play
      if (player.paused) {
        player.play()
        let self = this
        this.timer = setInterval(function () {
          self.currentTime += 1
          if (self.$refs.player.ended) {
            self.currentTime = 0
            self.play = false
            clearInterval(self.timer)
            self.timer = null
          }
        }, 1000)
      } else {
        clearInterval(this.timer)
        player.pause()
      }
    },
    show () {
      let self = this
      Resource.searchUrlByHash(this.$http, '7e66e95f4583c6fc21eb92a79b428990', function (err, url) {
        if (err) {
          self.$refs.alert.open()
        } else {
          self.$refs.player.src = url
          self.playReset()
          setTimeout(self.playOrPause, 200)
        }
      })
    }
  },
  components: {
    sideList
  },
  filters: {
    timeFilter
  },
  computed: {
    processRatio () {
      return (this.currentTime / this.songTime) * 100
    }
  }
}
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0px;
  background-color: white;
  z-index: 2;
}
.search-bar {
  height: 64px;
  position: fixed;
  z-index: 5;
  top: 0px;
  width: 100%;
}
.search-process {
  position: fixed;
  top: 64px;
  z-index: 10;
}
.search-list {
  position: fixed;
  top: 64px;
  bottom: 0px;
  overflow: auto;
}
.content {
  position: absolute;
  width: 100%;
  top: 56px;
  bottom: 56px;
  overflow: auto;
}
.bounce-enter-active {
  animation: bounce-in .25s;
}
.bounce-leave-active {
  animation: bounce-out .25s;
}
.search-input {
  width: 80%;
}
.music-control-container {
  position: fixed;
  bottom: 0px;
  background-color: white;
  z-index: 2;
}
.play-process-container {
  position: fixed;
  left: 0%;
  bottom: 0px;
  z-index: 2;
  height: 5px;
  width: 100%;
  background-color: rgba(0, 0, 0, .1);
  border-radius: 2px;
}
.play-process {
  position: absolute;
  left: 0px;
  top: 0px;
  background-color: #3F51B5;
  height: 100%;
  border-radius: 2px;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
