/**
 * @file 函数柯里化
 */
Function.prototype.curry = function() {
    let args = arguments;
    let that = this;
    return function() {
        console.log([...args].concat(...arguments))
        return that.apply(null, [...args].concat(...arguments));
    }
}

function add() {
    let args = [...arguments];
    let sum = 0, i = 0;
    while(i < args.length) {
        sum += args[i];
        i++;
    }
	return sum;
}
console.log(add.curry(2, 3)(4))