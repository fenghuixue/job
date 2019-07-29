class EventEmitter {
    constructor() {
        this._events = this._events || new Map();
        this._maxListener = this._maxListener || 10;
    }
}

EventEmitter.prototype.emit = function(type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
        for(let i = 0; i < handler.length; i++) {
            if (args.length > 0) {
                handler[i].apply(this, ...args);
            } else {
                handler[i].call(this);
            }
        }
    } else {
        if (args.length > 0) {
            handler.apply(this, ...args);
        } else {
            handler.call(this);
        }
    }
    return true;
}

EventEmitter.prototype.addListener = function(type, fn) {
    const handler = this._events.get(type);
    if (!handler) {
        this._events.set(type, fn);
    } else if (handler && typeof handler === 'function') {
        this._events.set(type, [handler, fn]);
    } else {
        this._events.push(fn);
    }
}

EventEmitter.prototype.removeLisener = function(type, fn) {
    const handler = this._events.get(type);
    if (handler && typeof handler === 'function') {
        this._events.delete(type, fn);
    } else {
        handler = handler.filter(item => item !== fn);
        if (handler.length === 1) {
            this._events.set(type, handler[0]);
        }
    }
}

emitter.addListener('arson', man => {
    console.log(`expel ${man}`);
});
emitter.addListener('arson', man => {
    console.log(`save ${man}`);
});

emitter.addListener('arson', man => {
    console.log(`kill ${man}`);
});

// 触发事件
emitter.emit('arson', 'low-end');
//expel low-end
//save low-end
//kill low-end
