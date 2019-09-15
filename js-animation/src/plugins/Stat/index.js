/**
 * @file 埋点插件
 */

export default {
    install(Vue, options) {
        // 埋点函数
        function $stat () {
            console.log(1111)
            
        }

        Vue.prototype.$stat = $stat;
    }
}