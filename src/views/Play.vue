<template lang="jade">
  #play-container
    md-layout(md-gutter)
      md-layout(md-flex="10", md-flex-small="5", md-flex-xsmall="0")
      md-layout(md-flex="30", md-flex-small="40" , md-flex-xsmall="100")
        .play-img-container
          .play-img
            img.song-img(src="../assets/song.jpg")
      md-layout(md-flex="50", md-flex-small="50", md-flex-xsmall="0")
        .play-text-container
          .play-text
            p 不为谁而做的歌
      md-layout(md-flex="10", md-flex-small="5", md-flex-xsmall="0")
</template>

<script>

export default {
  name: 'Play'
}
</script>

<style scoped>

#play-container {
  background: linear-gradient(to bottom, rgba(63, 81, 181, .2), rgba(0, 0, 0, 0));
}
.play-img-container {
  position: relative;
  width: 100%;
}
.play-img {
  position: relative;
  padding-top: 70%;
  margin: 15%;
  box-shadow: 0px 0px 100px rgba(0, 0, 0, .2);
  border: 1px solid rgba(0, 0, 0, .1);
}
.song-img {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
}
.play-text-container {
  position: relative;
  width: 100%;
}
.play-text {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  overflow: auto;
  font-size: 1.5em;
  color: rgba(1, 1, 1, .5);
}
</style>
