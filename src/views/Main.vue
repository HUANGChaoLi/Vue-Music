<template lang="jade">
  div
    md-bottom-bar.nav-bar
      md-bottom-bar-item(md-icon="music_note", @click.native="go('Music')") Music
      md-bottom-bar-item(md-icon="queue_music", @click.native="go('PlayList')") PlayList
      md-bottom-bar-item(md-icon="favorite", @click.native="go('Favorite')") Favorite
      md-bottom-bar-item(md-icon="search", @click.native="openSearchSidenav") Search
    transition(name="fade", mode="out-in")
      router-view.content(:songImg="playingSong.headpic", :songTitle="playingSong.filename")
    audio#player(ref="player", :src="playingSong.src")
    md-bottom-bar.music-control-container
      md-bottom-bar-item(md-icon="first_page", @click.native="playPrevSong") 上一首
      md-bottom-bar-item(:md-icon="play ? 'pause' : 'play_arrow'", @click.native="playOrPause") {{play ? '暂停' : '播放'}}
      md-bottom-bar-item(md-icon="last_page", @click.native="playNextSong") 下一首
      md-bottom-bar-item.like-icon(:md-icon="playingSong.like ? 'favorite' : 'favorite_border'", @click.native="markFavorite") 喜欢
      md-bottom-bar-item(@click.native="showVolumePicker($event)", :md-icon="volume ? 'volume_up' : 'volume_off'") 音量
        transition(name="fade", mode="out-in")
          volumePicker#volume-picker(v-if="showPicker", :changeVolume="changeVolume", :currentVolume="volume")
    .play-process-container
      .play-process(:style="{width: processRatio + '%'}")
    md-dialog-alert(md-content="网络错误，请检查网络设置", :md-ok-text="'ok'", ref="alert404")
    md-dialog-alert(md-content="尚无可播放曲目", :md-ok-text="'ok'", ref="alertPlay")
    md-dialog-alert(md-content="未知错误", :md-ok-text="'ok'", ref="alertUnknow")
    md-sidenav.md-left(ref="searchSidenav")
      md-toolbar.search-bar
        md-button.md-icon-button(@click.native="search")
          md-icon search
        md-input-container.search-input(md-inline)
          label Search Song
          md-input(v-model="keyword")
      md-progress.search-process(md-indeterminate, v-if="searchNow")
      sideList.search-list(:items="songs", :changeLike="updateLike", :changePlay="updatePlay", :defaultImg="defaultImg")
</template>

<script>
import Vue from 'Vue'
import sideList from '../components/sideList'
import volumePicker from '../components/volumePicker'
import router from '../router/index.js'
import Resource from '../services/resource.js'
import storage from '../services/storage.js'
import util from '../services/util.js'
import playQueueManager from '../services/PlayQueueManager.js'

export default {
  name: 'Main',
  data () {
    return {
      songs: [], // 搜索结果歌曲
      defaultImg: require('../assets/default.png'),
      keyword: '',
      searchNow: false,
      songTime: 0,
      play: false,
      currentTime: 0,
      timer: null,
      playingSong: {},
      alertContent: '',
      showPicker: false,
      volume: 1
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
        util.setAttrToItem(Vue, storage.getFavoriteSongs(), newSong, 'like')
        window.eventManager.$emit('PlayList.playSongADD', newSong)
        window.eventManager.$emit('Play.songChange', newSong)
        if (self.play) self.playOrPause()
        Resource.searchUrlByHash(self.$http, newSong.hash, function (err, url) {
          if (err) {
            self.$refs.alert.open()
          } else {
            self.playingSong = newSong
            self.playingSong.src = url
            self.playReset()
            setTimeout(self.playOrPause, 500)
          }
        })
      })
    }
  },
  methods: {
    showVolumePicker () {
      this.showPicker = !this.showPicker
    },
    changeVolume (val) {
      this.volume = val
      this.$refs.player.volume = this.volume
    },
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
        if (err) self.$refs.alert404.open()
        else self.songs = data
        util.updateAttrFromTo(Vue, storage.getFavoriteSongs(), self.songs, 'like', false)
      })
    },
    markFavorite () {
      if (!this.playingSong.hash) return this.$refs.alertPlay.open()
      this.playingSong.like = !this.playingSong.like
      if (this.playingSong.like) storage.addFavoriteSong(this.playingSong)
      else storage.removeFavoriteSong(this.playingSong)
      if (window) {
        window.eventManager.$emit('Favorite.changeLike')
        window.eventManager.$emit('PlayList.changeLike')
        window.eventManager.$emit('Search.changeLike', this.playingSong)
      }
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
      if (!this.playingSong.hash) return this.playNextSong()
      this.songTime = this.$refs.player.duration
      if (!this.songTime) this.songTime = 1
      if (this.songTime === 1) {
        // 说明需要重新等待获取
        let songTimer = setInterval(function () {
          self.songTime = self.$refs.player.duration ? self.$refs.player.duration : 1
          if (!(self.songTime === 1)) clearInterval(songTimer)
        }, 100)
      }
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
            self.playNextSong()
          }
        }, 1000)
      } else {
        clearInterval(this.timer)
        player.pause()
      }
    },
    __playThisSong (thisSong) {
      if (!thisSong) {
        this.$refs.alertPlay.open()
      } else if (window) {
        window.eventManager.$emit('Global.playSong', thisSong)
      } else {
        this.$refs.alertUnknow.open()
      }
    },
    playPrevSong () {
      let song = playQueueManager.getPrevSong(this.playingSong.hash)
      this.__playThisSong(song)
    },
    playNextSong () {
      let song = playQueueManager.getNextSong(this.playingSong.hash)
      this.__playThisSong(song)
    }
  },
  components: {
    sideList,
    volumePicker
  },
  computed: {
    processRatio () {
      return (this.currentTime / this.songTime) * 100
    }
  }
}
</script>

<style scoped>
#volume-picker {
  position: absolute;
  left: -10px;
  bottom: 60px;
}
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
.like-icon {
  color: rgba(237, 18, 91, .8) !important;
}
.like-icon:hover {
  color: rgba(237, 18, 91, 1) !important;
}
.fade-enter-active {
  animation: fade-in .25s;
}
.fade-leave-active {
  animation: fade-out .25s;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
