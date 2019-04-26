function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
    var O = R.prototype;// 取 R 的显式原型
    L = L.__proto__;    // 取 L 的隐式原型
    while (true) {
        if (L === null) // 已经找到顶层
            return false;
        if (O === L)   // 当 O 严格等于 L 时，返回 true
            return true;
        L = L.__proto__;  // 继续向上一层原型链查找
    }
}

function myInstance(L, R) {
    let O = R.prototype;
    L = L.__proto__;
    while(true) {
        if (L === null) {
            return false;
        }
        if (O === L) {
            return true;
        }
        L = L.__proto__;
    }
}