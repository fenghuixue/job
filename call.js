function log() {
    console.log.call(console, arguments);
}
log(111)

let obj = {
	a: '1'
}
function myBind() {
	console.log('mybind', arguments)
	console.log(this)
}
let mybind2 = myBind.bind(obj, 1,2,5);
mybind2(3,4)
//  mybind Arguments(5) [1, 2, 5, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
//  {a: "1"}


// 定义这个方法为myBind
Function.prototype.myBind = function(thisArg) {
    if (typeof this !== 'function') {
        return;
    }
    var _self = this;
    var args = Array.prototype.slice.call(arguments, 1) //从第二个参数截取
    return function() {
        return _self.apply(thisArg, args.concat(Array.prototype.slice.call(arguments))); // 注意参数的处理
    }
}