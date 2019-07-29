const callbacks = []
let pending = false;
function flushCallbacks() {
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for(let i = 0; i <copies.length; i++) {
        copies[i]();
    }
}

let microTimerFunc;
const p = promise.resolve();
microTimerFunc = () => {
    p.then(flushCallbacks);
}
export function nextTick(cb, ctx) {
    callbacks.push(() => {
        if (cb) {
            cb.call(ctx);
        }
        if (!pending) {
            pending = true;
            microTimerFunc();
        }
    })
} 

nextTick(function() {
    console.log(this.name)
}, {name: '1111'})