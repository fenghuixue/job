const shareOptionDefine = {
    enumarable: true,
    configurable: true,
    get: function() {},
    set: function() {}
}
export function proxy(target, sourceKey, key) {
    shareOptionDefine.get = function proxyGetter() {
        return this[sourceKey][key];
    }
    shareOptionDefine.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    }
    Object.defineProperty(target, key, shareOptionDefine);
}