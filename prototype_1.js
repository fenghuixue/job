function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}

function sayName() {
    return this.name;
}

let person1 = new Person('zhangsan', 21);
console.log('构造函数模式----: ', person1)

function Parent() {
    this.colors = ['red', 'yellow', 'blue'];
}

function Child() {
    Parent.call(this);
}
// Child.prototype = new Parent();
let instance = new Child();
instance.colors.push('white');

let instance2 = new Child();
console.log('prototype实现原型继承------: instance', instance);
console.log('prototype实现原型继承------: instance2', instance2);
