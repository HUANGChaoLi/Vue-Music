<template lang="jade">
  div
    transition(name="bounce", mode="out-in")
      router-view.content
    md-bottom-bar.nav-bar
      md-bottom-bar-item(md-icon="music_note", @click.native="go('Play')", md-active) Music
      md-bottom-bar-item(md-icon="ondemand_video") Movies
      md-bottom-bar-item(md-icon="favorite", @click.native="go('Favorite')") Favorite
      md-bottom-bar-item(md-icon="search", @click.native="openSearchSidenav") Search
    audio#player(ref="player", src="http://api.dagoogle.cn/music/demo_files/2015102514171913388512.mp3")
    .play-process-container
      .play-process(:style="{width: processRatio + '%'}")
    md-bottom-bar.music-control-container
      md-bottom-bar-item(md-icon="first_page", @click.native="show") 上一首
      md-bottom-bar-item(:md-icon="play ? 'pause' : 'play_arrow'", @click.native="playOrPause") {{play ? '暂停' : '播放'}}
      md-bottom-bar-item(md-icon="last_page") 下一首
      md-bottom-bar-item(md-icon="favorite_border") 喜欢
      md-bottom-bar-item(md-icon="volume_up") {{songTime | timeFilter}}
    md-dialog-alert(:md-content="'查询失败，请检查网络状况'", :md-ok-text="'ok'", ref="alert")
    md-sidenav.md-left(ref="searchSidenav")
      md-toolbar
        md-button.md-icon-button(@click.native="search")
          md-icon search
        md-input-container.search-input(md-inline)
          label Search Song
          md-input(v-model="keyword")
      md-progress(md-indeterminate, v-if="searchNow")
      songList(:items="songs")

</template>

<script>
import router from '../router/index.js'
import songList from './songList'
import timeFilter from '../filters/Time.js'
import Resource from '../services/resource.js'
// http://m.kugou.com/app/i/getSongInfo.php?hash=7e66e95f4583c6fc21eb92a79b428990&cmd=playInfo

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
      timer: null
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
      })
      // this.$http.jsonp('http://api.dagoogle.cn/music/search?keyword=' + this.keyword)
      // .then(function (res) {
      //   this.searchNow = false
      //   this.songs = res.body.data
      // }, function () {
      //   this.searchNow = false
      //   this.$refs.alert.open()
      // })
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
          setTimeout(self.playOrPause, 100)
        }
      })
      // console.log(this.$refs.player.currentTime)
    }
  },
  components: {
    songList
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
}
.content {
  margin-top: 56px;
  margin-bottom: 56px;
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
}
.play-process-container {
  position: fixed;
  left: 0%;
  bottom: 0px;
  /*margin-left: 2%;*/
  height: 5px;
  width: 100%;
  background-color: rgba(0, 0, 0, .1);
  border-radius: 2px;
  z-index: 1;
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
