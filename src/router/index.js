import Vue from 'vue'
import Router from 'vue-router'
import Main from 'views/Main'
import Favorite from 'views/Favorite'
import Play from 'views/Play'
import PlayList from 'views/PlayList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/Music'
    },
    {
      path: '/Music',
      component: Main,
      children: [
        {
          path: '/',
          redirect: 'Play'
        },
        {
          path: 'Favorite',
          name: 'Favorite',
          component: Favorite
        },
        {
          path: 'Play',
          name: 'Play',
          component: Play
        },
        {
          path: 'PlayList',
          name: 'PlayList',
          component: PlayList
        }
      ]
    }
  ]
})
