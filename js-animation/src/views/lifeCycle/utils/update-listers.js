import {invokeWithErrorHandling} from './error'
const normalizeEvent = name => {
    const passive = name.charAt(0) === '&';
    name = passive ? name.slice(1) : name;
    const once = name.charAt(0) === '~';
    name = once ? name.slice(1) : name;
    const capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
        name,
        capture,
        once,
        passive
    }
}
export function updateListeners(on, oldOn, add, remove, vm) {
    for(let name in on) {
        let cur = on[name];
        let old = oldOn[name];
        // normalizeEvent 用于解析标签上的属性，如capture, once, passive
        let event = normalizeEvent(name);
        if (!cur) {
            // 当前事件不存在
            process.env.NODE_ENV !== 'production' && warn('Invalid handler for event ' + event.name);
        } else if (!old) {
            // oldListener不存在时，需要新增事件
            if (!cur.fns) {
                // cur的fns不存在时， 新增事件处理函数
                cur = on[name] = createFnInvoker(cur);
            }
            add(event.name, cur, event.once, event.capture, event.passive);
        } else if (cur !== old) {
            // 当事件发生变化，用当前cur替换 oldOn的事件处理函数
            old.fns = cur;
            on[name] = old;
        }
    }
    for (let name in oldOn) {
        // 遍历 oldOn, 如果属性在on中不存在，则移除事件
        if (!on[name]) {
            let event = normalizeEvent(name);
            remove(event.name, oldOn[name], event.capture);
        }
    }
}

export function createFnInvoker(fns, vm) {
    function invoker() {
        const fns = invoker.fns;
        if (Array.isArray(fns)) {
            // 数组的浅拷贝 array.slice()
            const cloned = fns.slice();
            for (let i = 0; i < cloned.length; i++) {
                invokeWithErrorHandling(cloned[i], null, arguments, vm, `v-on handler`)
            }
        } else {
            return invokeWithErrorHandling(fns, null, arguments, vm, `v-on handler`)
        }
    }
    invoker.fns = fns;
    return invoker;
}