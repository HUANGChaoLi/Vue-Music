// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

// CSS
import './assets/styles/vue-material.css'
import './assets/styles/icon.css'
import './assets/styles/fonts.css'

/* Use all import modules */
Vue.use(VueMaterial)
Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
