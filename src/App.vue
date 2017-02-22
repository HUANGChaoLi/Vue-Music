<template lang="jade">
  #app
    //- side-nav
    router-view
</template>

<script>
// import sideNav from './components/sideNav'
import Vue from 'Vue'

export default {
  name: 'app'
}

// global event sender

if (window) window.eventManager = new Vue({})

</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotating 2s linear infinite;
}
</style>
