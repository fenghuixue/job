// 遍历器生成函数

function makeIterator(arr) {
    let index = 0;
    return {
        next: function() {
            return index < arr.length ? 
                {value: arr[index++], done: false}
                : {value: undefined, done: true};
        }
    }
}

let it = makeIterator([3, 4, 5, 8]);
it.next();
it.next();
it.next();


// 给一个对象实现一个Iterator方法

let obj = {
    a:1,
    b:2,
    [Symbol.iterator](){
        let index = 0;
        return {
            next: () => {
                //console.log(this === obj) //true
                let keys = Object.keys(this); //这里的 this 还是指向 obj 对象本身，next 的调用方式是这样的 obj.next()
                return index >= keys.length ? {done: true} : {value: this[keys[index++]]}
            }
        }
    }
};
for (let val of obj) {
    console.log(val);
}


// 使用generator实现一个Iterator方法

function *IteratorObj(obj) {
    let keys = Object.keys(obj);
    for (let key of keys) {
        yield obj[key];
    }
}

let obj1 = {
    a:1,
    b:2,
    *[Symbol.iterator](){
        let keys = Object.keys(this);
        for (let key of keys) {
            yield this[key];
        }
    }
};

for (let val of obj1) {
    console.log(val);
}

// 偷懒的方式，类数组对象可以调用数组的迭代器方法

let iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item); // 'a', 'b', 'c'
}

/**
 * 迭代器方法的使用场景： 
 * 1. 解构赋值，这个是指具有Iterator属性的解构。对象的结构原理完全不同
 * 2. 扩展运算符 ...
 * 3. yield* :相当于调用后面值的iterator接口
 * 4. for...of: 可以用break跳出循环
 * 5. Array.from()
 * 6. Map(), Set(), WeakMap(), WeakSet()
 * 7. Promise.all()
 * 8. Promise.race()
 */

function myArrayFrom() {
    let [arr, func] = arguments;
    if (!arr.length) return arr;
    let slice = Array.prototype.slice;
    let newArr = slice.call(arr);
    if (func instanceof Function) {
        newArr = newArr.map(item => func(item))
    }
    return newArr;
}

let obj3 = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
myArrayFrom(obj3, item => item + 'hahhha');

/**
 * 原生具有迭代器方法的有：
 * 1. Array, Map, Set
 * 2. String
 * 3. 函数的 arguments 对象
 * 4. NodeList 对象
 * 5. TypedArrays
 */ 


