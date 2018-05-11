import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import Questions from '@/pages/Questions'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/settings/:type',
    name: 'settings',
    component: Settings
  },
  {
    path: '/questions',
    name: 'questions',
    component: Questions
  }
]

const router = new VueRouter({
  mode: 'history',
  // history: true,
  // base: __dirname,
  routes: routes
})

export default router