/**
 * @file 学习vue的生命周期
 * @author zq6
 */

(function(global, factory) {
    // 判断执行环境
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self,  global.myVue = factory)
})(this, function() {
    const myVue = function() {};
    return myVue;
});