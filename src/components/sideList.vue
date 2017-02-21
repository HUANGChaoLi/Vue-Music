<template lang="jade">
  ul
    li(v-for="(item, index) in items", v-on:click="active(index)", v-bind:class="{ active: index == activeIndex }")
      md-layout(md-gutter)
        md-layout(md-flex="30")
          md-icon {{item.icon}}
        md-layout
          h3 {{item.text}}
</template>

<script>
import router from '../router/index.js'
export default {
  name: 'sideList',
  props: ['items'],
  data: function () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    active (index) {
      this.activeIndex = index
      router.push({name: this.items[index].go})
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0px !important;
}
ul li {
  list-style: none;
  display: block;
  margin: 0px !important;
  border-left: 2px solid rgba(0,0,0,0);
  cursor: pointer;
}
ul li:hover, ul li.active {
  background-color: rgba(0,0,0,.1);
}
ul li.active {
  border-left: 2px solid red;
}
</style>
