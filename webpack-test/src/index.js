console.log('11111')

import './index.less'
import Vue from 'vue';
import Index from './index.vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

let arr = [1, 3, 4, 5];

arr.map(item => {
    console.log(item)
});

console.log(arr)
Vue.use(ElementUI)

new Vue({
    el: '#J_view_box',
    // router,
    // store,
    render: h => h(Index)
})

