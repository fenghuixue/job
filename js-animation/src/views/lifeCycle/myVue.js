/**
 * @file 学习vue的生命周期
 * @author zq6
 */
import {initMixin} from './init';

// (function(global, factory) {
//     // 判断执行环境
//     typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
//         typeof define === 'function' && define.amd ? define(factory) :
//             (global = global || self,  global.myVue = factory)
// })(this, function() {
    function myVue (options) {
        // if (process.env.NODE_ENV !== 'production' &&
        //     !(this instanceof myVue)
        // ) {
        //     warn('myVue is a constructor and should be called with the `new` keyword')
        // }
        this._init(options);
    }
    initMixin(myVue);
    export default myVue;
// });