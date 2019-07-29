Function.prototype.call2 = function(content = window) {
    content.fn = this;
    let args = [...arguments].slice(1);
    let result = content.fn(...args);
    delete content.fn;
    return result;
}
Function.prototype.bind2 = function(content) {
    if (typeof this != 'function') {
        return new Error('this is a error function');
    }
    let fn = this;
    let args = [...arguments].slice(1);
    return function(context) {
        let newArgs = [...arguments].slice(1)
        let res = fn(...args, ...newArgs);
        return res;
    }
}
let a = 1;
let obj = {
    a: 3,
    b: 1
}
function test() {
   return this.a;
}
// console.log(test.call2(obj, '1111'));
console.log(test.bind2(obj, '1111')());



