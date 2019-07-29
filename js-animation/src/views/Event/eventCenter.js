/**
 * @file EventCenter
 * @author zq6
 */

class EventCenter {
    constructor() {

    }

} 

EventCenter.prototype.on = function(event, fn) {
    const ec = this;
    if (Array.isArray(event)) {
        for (let i = 0; i < event.length; i++) {
            ec.on(event[i], fn)
        }
    } else {
        ec._events[event] || (ec._events = []).push(fn);
    }
}