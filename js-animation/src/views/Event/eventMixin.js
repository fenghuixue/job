export default function eventMixin(EventCenter) {
    EventCenter.prototype.on = function(event, fn) {
        const ec = this;
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                ec.on(event[i], fn)
            }
        } else {
            (ec._events[event] || (ec._events[event] = [])).push(fn);
        }
    }
    
    EventCenter.prototype.off = function(event, fn) {
        const ec = this;
        if (!arguments.length) {
            ec._events = Object.create(null);
            return ec
        }
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                ec.off(event[i], fn);
            }
            return ec;
        }
        const cbs = ec._events[event];
        if (!cbs) {
            return ec;
        }
        if (arguments.length === 1) {
            ec._events[event] = null;
            return ec;
        }
        if (!fn) {
            ec._events[event] = null
            return ec
        }
        let cb;
        let i = cbs.length;
        while (i--) {
            cb = cbs[i];
            if (cb === fn || cb.fn === fn) {
                console.log(cb === fn)
                cbs.splice(i, 1);
                break;
            }
        }
        return ec;
    }
    
    EventCenter.prototype.once = function(event, fn) {
        const ec = this;
        function _on() {
            ec.off(event, _on);
            fn.apply(ec, arguments);
        }
        _on.fn = fn;
        ec.on(event, _on);
        return ec;
    }
    
    
    EventCenter.prototype.emit = function(event) {
        const ec = this;
        let cbs = ec._events[event];
        if (cbs) {
            const args = Array.from(arguments).slice(1);
            for(let i = 0; i < cbs.length; i++) {
                try {
                    cbs[i].apply(ec, args);
                } catch(e) {
                    new Error('error');
                }
            }
        }
        return ec;
    }
    
    
}
