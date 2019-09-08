import { updateListeners } from "./utils/update-listers";

/**
 * @file 事件相关
 */

export function initEvents(vm) {
    vm._events = Object.create(null);
    /**
     * 关于父组件的模板使用v-on监听子组件触发的increment事件，并在子组件中使用this.$emit触发该事件
     * 因为在模板编译阶段，我们会把整个模板编译成渲染函数，当渲染流程启动时，渲染函数会执行生成一份VNode。
     * 此时，会判断当前标签是真的浏览器标签还是一个组件；如果是组件标签，会将子组件实例化并传递一些参数, 包括父组件通过v-on注册的事件
     * 如果是平台标签, 事件会注册到浏览器标签上
     */
    // 初始化话父组件附加的事件
    const listeners = vm.$options._parentListeners;
    if (listeners) {
        updateComponentListeners(vm, listeners);
    }
    
} 
let target;
function add (event, fn, once) {
    if (once) {
        target.$once(event, fn);
    } else {
        target.$on(event, fn);
    }
} 

function remove(event, fn) {
    target.$off(event, fn);
}
export function updateComponentListeners (vm, listeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove, vm);
}

