<template lang="jade">
  #app
    router-view
    md-dialog-alert(md-content="未知错误，欢迎到https://github.com/HUANGChaoLi/Vue-Music提Issue，错误信息在控制台下", :md-ok-text="'ok'", ref="alertUnknow")
</template>

<script>
import Vue from 'Vue'

export default {
  name: 'app',
  mounted () {
    // global error handler
    Vue.config.errorHandler = function (err, vm) {
      console.log(err)
    }
  }
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
