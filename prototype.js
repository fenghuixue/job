// Object.prototype.toString, ES5开始可以使用Symbol.toStringTag来定义Object.prototype.toString的行为
let o = {
    [Symbol.toStringTag]: 'i am Object.prototype.toString'
}

console.log(o + '');

// 原型链式继承
// let Person = {
//     name: 'zhangsan',
//     color: ['red', 'yellow']
// }

// let anotherPerson = Object.create(Person)
// anotherPerson.name = 'lisi';
// anotherPerson.sayName = function() {
//     return this.name;
// }

// console.log(anotherPerson.sayName())


// 组合式继承
// function superType(name) {
//     this.name = name;
//     this.colors = ['red', 'yellow'];
// }
// superType.prototype.sayName = function() {
//     return this.name;
// }

// function subType(name, age) {
//     superType.call(this, name);
//     this.age = age;
// }

// subType.prototype = new superType();
// subType.constructor = subType;
// subType.sayAge = function() {
//     return this.age;
// }

// let instance = new subType('zhangsan', 22)
// let instance2 = new subType('zhangsan', 22)
// instance2.colors.push('green')

// console.log('instance', instance)
// console.log('instance2', instance2)

// 寄生组合式

// function inheritPrototype(superType, subType) {
//     let prototype = Object.create(superType.prototype);
//     subType.constructor = subType;
//     subType.prototype = prototype;
// }

// function superType(name) {
//     this.name = name;
//     this.colors = ['red', 'yellow'];
// }
// superType.prototype.sayName = function() {
//     return this.name;
// }

// function subType(name, age) {
//     superType.call(this, name);
//     this.age = age;
// }

// inheritPrototype(superType, subType);
// subType.sayAge = function() {
//     return this.age;
// }
// let instance = new subType('zhangsan', 22)
// let instance2 = new subType('zhangsan', 22)
// instance2.colors.push('green')

// console.log('instance', instance)
// console.log('instance2', instance2)

// // 区别： 
// subType.prototype = new superType();
// subType.prototype = Object.create(superType.prototype);

// new和Object.create的区别

var Base = function () {
    this.a = 2
}
Base.prototype.a = 3;
var o1 = new Base();
var o2 = Object.create(Base);
console.log(o1.a);
console.log(o2.a);
