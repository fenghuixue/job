/**
 * @file 错误处理
 */
import config from "./config.js";

export function handleError(err, vm, info) {
    if (vm) {
        let cur = vm;
        // 牛逼的写法。通过while，循环给 cur赋值为 cur.$parent, 且当cur为vm时，循环中止
        while((cur = cur.$parent)) {
            const hooks = cur.$options.errorCapture;
            if (hooks) {
                for (let i = 0; i < hooks.length; i++) {
                    try {
                        // 一个错误捕获到 阻止继续
                        const capture = hooks[i].call(cur, err, vm, info) === false;
                        if (capture) return;
                    } catch(e) {
                        globalHandleError(e, cur, 'errorCaptured hook');
                    }
                }
                
            }
        }
    }
    globalHandleError(err, vm, info);
} 

function globalHandleError(err, vm, info) {
    if (config.errorHandler) {
        try {
            return config.errorHandler.call(null, err, vm, info);
        } catch(e) {
            logErr(e);
        }
    }
    logErr(err);
}

function logErr(e) {
    console.error(e);
}


export function invokeWithErrorHandling(handler, context, args, vm, info) {
    let res;
    try {
        res = args ? handle.apply(context, args) : handler.call(context);
        if (res && !res._isVue && isPromise(res) && !res._handled) {
            res.catch(e => handleError(e, vm, info + ` (Promise/async)`))
            // issue #9511
            // avoid catch triggering multiple times when nested calls
            res._handled = true
        }
    } catch (e) {
        handleError(e, vm, info);
    }
    return res;
}