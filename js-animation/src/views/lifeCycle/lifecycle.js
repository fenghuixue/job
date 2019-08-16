/**
 * @file 生命周期函数
 * @author zq6
 */

export function initLifecycle(vm) {
    // 添加$root
    vm.$root = vm.$parent ? vm.$parent.$root : vm;
    vm.$children = []
    vm.$refs = {}
    vm._watcher = null
    vm._inactive = null
    vm._directInactive = false
    vm._isMounted = false
    vm._isDestroyed = false
    vm._isBeingDestroyed = false
} 

export function lifecycleMixin(myVue) {
    myVue.prototype._update = function () {

    }
    myVue.prototype.$forceUpdate = function() {
        
    }
    myVue.prototype.$destroy = function () {}
}

export function callHook(vm, hook) {
    console.log(vm)
    // const handlers = vm.$options[hook];
    // if (handlers) {
    //     for(let i = 0; i < handlers.length; i++) {
    //         try {
    //             handlers[i].call(vm);
    //         } catch (e) {
    //             handleError(e, vm, `${hook} hook`)
    //         }
    //     }
    // }
}