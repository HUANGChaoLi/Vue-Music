<template lang="jade">
  #Favorite
    md-table(v-if="songs.length > 0")
      md-table-header
        md-table-row
          md-table-head(v-for="header in headers") {{header}}
      md-table-body
        md-table-row(v-for="(song, index) in songs")
          md-table-cell
            md-layout(md-gutter)
              md-layout.songname(md-flex="60") {{song.filename}}
            .play
              md-icon play_arrow
              md-icon.favorite-icon.md-accent(@click.native="cancelFavorite(index)") favorite
          md-table-cell {{song.singername}}
          md-table-cell {{song.album_name}}
          md-table-cell {{song.time | timeFilter}}
    div(v-else)
      .nothing-icon
        md-icon.nothing-icons assignment
      .nothing-text 尚无喜欢的音乐


</template>

<script>

import timeFilter from '../filters/Time.js'

let headers = ['歌曲', '歌手', '专辑', '时长']
let songs = [
  {
    filename: 'Break My Heart',
    singername: 'Blue',
    album_name: 'roulette',
    time: 1452082366
  },
  {
    filename: 'Break My Heart',
    singername: 'Blue',
    album_name: 'roulette',
    time: 1452082366
  },
  {
    filename: 'Break My Heart',
    singername: 'Blue',
    album_name: 'roulette',
    time: 1452082366
  }
]

export default {
  name: 'Favorite',
  data () {
    return {
      headers,
      songs
    }
  },
  methods: {
    cancelFavorite (index) {
      this.songs.splice(index, 1)
    }
  },
  filters: {
    timeFilter
  }
}
</script>

<style scoped>
.md-table-cell {
  text-align: left;
}
.songname {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.md-table-row .play {
  display: none;
}
.md-table-row:hover .play {
  display: block;
  position: absolute;
  padding: 10px;
  cursor: pointer;
  right: 10px;
  top: 0px;
  size: 46px;
  color: rgb(63, 81, 181);
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
