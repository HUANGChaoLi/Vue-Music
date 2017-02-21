<template lang="jade">
  #app
    //- side-nav
    router-view
</template>

<script>
import sideNav from './components/sideNav'

export default {
  name: 'app',
  components: {
    sideNav
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
</style>
