import { toggleObserving } from "./observe";

export function initState(vm) {
    vm._watchers = [];
    const opts = vm.$options;
    if (opts.props) initProps(vm, opts.props);
}

function initProps(vm, propsOptions) {
    const propsData = vm.$options.propsData;
    const props = vm._props = {};
    // 缓存props中的key
    const keys = vm.$options._propsKeys = [];
    const isRoot = !vm.$parent;
    // 非根节点root的props转换为响应式数据
    if (!isRoot) {
        // toggleObserving是用来确定并控制defineReactive函数所传进来的value参数是否转换成响应式的
        toggleObserving(false)
    }
    for (const key in propsOptions) {
        keys.push(key);
        const value = validateProp(key, propsOptions, propsData, vm);
        defineReactive(props, key, value);
        if (!(key in vm)) {
            proxy(vm, `_props`, key)
        }
    }
    toggleObserving(true);
    
}

