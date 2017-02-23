<template lang="jade">
  #play-container
    md-layout(md-gutter)
      md-layout(md-flex="30", md-flex-small="20", md-flex-xsmall="0")
      md-layout(md-flex="40", md-flex-small="60" , md-flex-xsmall="100")
        .play-container
          .play-img
            img.song-img(:src="songImgSrc")
          .play-title
            p {{songTitleText}}
      md-layout(md-flex="30", md-flex-small="20", md-flex-xsmall="0")
</template>

<script>

export default {
  name: 'Play',
  props: ['songImg', 'songTitle'],
  data () {
    return {
      songImgSrc: require('../assets/song.jpg'),
      songTitleText: '暂未播放歌曲'
    }
  },
  mounted () {
    let self = this
    if (self.songImg) self.songImgSrc = self.songImg
    if (self.songTitle) self.songTitleText = self.songTitle
    if (window) {
      window.eventManager.$on('Play.songChange', function (newSong) {
        if (!newSong || !newSong.imgSrc) self.songImgSrc = require('../assets/song.jpg')
        else self.songImgSrc = newSong.imgSrc
        if (!newSong || !newSong.filename) self.songTitleText = '此歌曲无名字'
        else self.songTitleText = newSong.filename
      })
    }
  }
}
</script>

<style scoped>

#play-container {
  background: linear-gradient(to bottom, rgba(63, 81, 181, .2), rgba(0, 0, 0, 0));
}
.play-container {
  position: relative;
  width: 100%;
  border-radius: 2px;
}
.play-img {
  position: relative;
  padding-top: 70%;
  margin: 15%;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, .2);
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 2px;
}
.song-img {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.play-title {
  width: 100%;
  font-size: 1.5em;
  margin-top: -5%;
  color: rgba(1, 1, 1, .5);
  padding: 0px 10px;
}
</style>
