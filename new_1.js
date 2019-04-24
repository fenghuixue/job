function New(func) {
    var res = {};
    if (func.prototype !== null) {
        res._proto_ = func.prototype;
    }
    var slice = Array.prototype.slice;
    var ret = func.apply(res, slice.call(arguments, 1));
}