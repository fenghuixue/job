// Object.prototype.toString, ES5开始可以使用Symbol.toStringTag来定义Object.prototype.toString的行为
let o = {
    [Symbol.toStringTag]: 'i am Object.prototype.toString'
}

console.log(o + '');
