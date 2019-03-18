import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import Guide from './views/Guide.vue'
import Games from './views/Games.vue'
import Plays from './views/Plays.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'guide',
      component: Guide
    },
    {
      path: '/games',
      name: 'games',
      component: Games
    },
    {
      path: '/plays',
      name: 'plays',
      component: Plays
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
