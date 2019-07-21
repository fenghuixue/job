import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Transform from './views/Transform'
import lifeCycle from './views/lifeCycle'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/lifeCycle',
    name: 'lifeCycle',
    component: lifeCycle
  }, {
    path: '/transform',
    name: 'transform',
    component: Transform
  }]
})
