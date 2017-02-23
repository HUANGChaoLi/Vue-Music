import Vue from 'vue'
import Router from 'vue-router'
import Main from 'views/Main'
import Music from 'views/Music'
import PlayList from 'views/PlayList'
import Favorite from 'views/Favorite'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        {
          path: '/',
          redirect: 'Music'
        },
        {
          path: 'Favorite',
          name: 'Favorite',
          component: Favorite
        },
        {
          path: 'Music',
          name: 'Music',
          component: Music
        },
        {
          path: 'PlayList',
          name: 'PlayList',
          component: PlayList
        }
      ]
    },
    {
      path: '/*',
      redirect: '/'
    }
  ]
})
