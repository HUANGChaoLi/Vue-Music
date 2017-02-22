<template lang="jade">
  .songList
    ul
      md-whiteframe(md-elevation="0", v-for="(item, index) in items")
        md-ink-ripple
        li(v-on:click="active(index)", v-bind:class="{ active: index == activeIndex }")
          .list-container
            .img-container(@click='changePlay(index)')
              img.song-img(:src="item.headpic")
            .song-ctrl
              md-icon.ctrl-icon(@click.native='changePlay(index)') play_circle_outline
              md-icon.ctrl-icon(@click.native='changeLike(index)', :class='{like: item.like}') {{item.like ? 'favorite' : 'favorite_border'}}
              md-icon.ctrl-icon(v-if="hasDelete") delete
            .other-container(@click='changePlay(index)')
              .song-filename {{item.filename}}
              .song-albumname {{item.album_name}}
</template>

<script>

export default {
  name: 'songList',
  props: ['items', 'changeLike', 'changePlay', 'delete', 'hasDelete'],
  data: function () {
    return {
      activeIndex: -1
    }
  },
  methods: {
    active (index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped>
.songList {
  padding-top: 1px;
}
ul {
  padding: 0px;
  margin: 0px !important;
}
ul .md-whiteframe {
  border-bottom: 1px solid rgba(63, 81, 181, .1);
}
ul li {
  list-style: none;
  display: block;
  position: relative;
  margin: 0px !important;
  border-left: 2px solid rgba(0,0,0,0);
  cursor: pointer;
  padding: 5px;
}
ul li:hover, ul li.active {
  background-color: rgba(0,0,0,.1);
}
ul li.active {
  border-left: 2px solid red;
}

.list-container {
  position: relative;
  min-height: 50px;
}

.img-container {
  width: 50px;
  float: left;
}
.other-container {
  margin-left: 55px;
  margin-right: 100px;
  height: 100%;
}

.song-img {
  display: block;
  width: 50px;
  height: 50px;
}
.song-filename {
  text-align: left;
  font-weight: bold;
  font-size: 15px;
  color: rgba(63, 81, 181, .8);
}
.song-albumname {
  text-align: left;
}
.song-filename, .song-albumname {
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-ctrl {
  /*position: absolute;*/
  display: inline-block;
  float: right;
  height: 100%;
  padding: 14px 0px;
  width: 100px;
/*  right: 5px;
  top: 14px;
*/}
.song-ctrl .ctrl-icon {
  color: rgba(0, 0, 0, .4);
  display: inline-block;
  margin-right: 4px;
}
.song-ctrl .like {
  color: #e91e63 !important;
}
.song-ctrl .ctrl-icon:hover {
  color: rgba(63, 81, 181, .8);
}


</style>
