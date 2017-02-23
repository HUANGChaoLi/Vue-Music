<template lang="jade">
  ul
    md-whiteframe(md-elevation="0", v-for="(item, index) in items", @click.native="changePlay(index)")
      md-ink-ripple
      li(v-on:click="active(index)", v-bind:class="{ active: index == activeIndex }")
        md-layout(md-gutter)
          md-layout(md-flex="20")
            img.song-img(:src="item.headpic ? item.headpic : defaultImg")
          md-layout
            .song-filename {{item.filename}}
            .song-albumname {{item.album_name}}
            .song-time {{item.time | timeFilter}}
            .song-ctrl
              md-icon.ctrl-icon(@click.native.stop='changePlay(index)') play_circle_outline
              md-icon.ctrl-icon(@click.native.stop='changeLike(index)', :class='{like: item.like}') {{item.like ? 'favorite' : 'favorite_border'}}
</template>

<script>

import timeFilter from '../filters/Time.js'

export default {
  name: 'sideList',
  props: ['items', 'changeLike', 'changePlay', 'defaultImg'],
  data: function () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    active (index) {
      this.activeIndex = index
    }
  },
  filters: {
    timeFilter
  }
}
</script>

<style scoped>

ul {
  padding: 0px;
  margin: 0px !important;
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

.song-img {
  display: block;
  width: 50px;
  height: 50px;
}
.song-filename {
  width: 170px;
  text-align: left;
  font-weight: bold;
  font-size: 15px;
  color: rgba(63, 81, 181, .8);
}
.song-albumname {
  display: inline-block;
  text-align: left;
  width: 170px;
}
.song-filename, .song-albumname {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.song-time {
  width: 50px;
  overflow: hidden;
  text-align: right;
}
ul li:hover .song-time, .song-ctrl {
  display: none;
}
.song-ctrl .ctrl-icon {
  color: rgba(0, 0, 0, .4);
}
.song-ctrl .like {
  color: #e91e63 !important;
}
.song-ctrl .ctrl-icon:hover {
  color: rgba(63, 81, 181, .8);
}
ul li:hover .song-ctrl {
  position: absolute;
  display: block;
  right: 5px;
  top: 15px;
}

</style>
