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