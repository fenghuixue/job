import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import Transform from './views/Transform'
import lifeCycle from './views/lifeCycle/main'
import Event from './views/Event'
import myPromise from './views/myPromise'
import loadable from './views/reactLoadable'
import TSTest from './views/TSTest'
import Practise from './views/Practise'
import WebComponent from './views/webComponent'
import ProxyTest from './views/Proxy'

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
  }, {
    path: '/event',
    name: 'event',
    component: Event
  }, {
    path: '/promise',
    name: 'promise',
    component: myPromise
  }, {
    path: '/loadable',
    name: 'loadable',
    component: loadable
  }, {
    path: '/tsTest',
    name: 'tsTest',
    component: TSTest
  }, {  
    path: '/practise',
    name: 'practise',
    component: Practise
  }, {
    path: '/webComponent',
    name: 'WebComponent',
    component: WebComponent
  }, {
    path: '/proxy',
    name: 'ProxyTest',
    component: ProxyTest
  }]
})
