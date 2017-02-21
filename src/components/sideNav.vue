<template lang="jade">
  #side-nav
    md-toolbar
      md-button.md-icon-button(@click.native="toggle")
        md-icon menu
      h2.md-title Music
      //- md-input-container.search(md-inline)
      //-   label Inline field
      //-   md-input
    md-sidenav.md-left(ref="leftSidenav")
      md-toolbar
        .md-toolbar-container
          md-layout(md-gutter)
            md-layout(md-flex="20")
              md-icon weekend
            md-layout
              .md-title 音乐你的生活
      side-list(:items="items")
</template>

<script>
import sideList from './sideList'

let listItem = [
  {
    text: '私人MV',
    icon: 'music_video',
    go: 'Play'
  },
  {
    text: '发现音乐',
    icon: 'library_music',
    go: 'APP'
  },
  {
    text: '发现朋友',
    icon: 'perm_contact_calendar',
    go: 'APP'
  }
]

export default {
  name: 'Nav',
  data: function () {
    return {
      items: listItem
    }
  },
  methods: {
    toggle () {
      this.$refs.leftSidenav.toggle()
    }
  },
  components: {
    sideList
  }
}
</script>

<style scoped>
#side-nav {

}
/*.search {
  width: 220px;
}*/
</style>
