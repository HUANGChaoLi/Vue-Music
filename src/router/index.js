import Vue from 'vue'
import Router from 'vue-router'
import Main from 'components/Main'
import Favorite from 'components/Favorite'
import Play from 'components/Play'
import PlayList from 'components/PlayList'

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
