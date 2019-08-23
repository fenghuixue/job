import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vconsole from './libs/vconsole.min.js';
import ElementUI from 'element-ui'

Vue.config.productionTip = false
// process.env.NODE_ENV === 'development' && new VConsole();
Vue.use(ElementUI);
const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
