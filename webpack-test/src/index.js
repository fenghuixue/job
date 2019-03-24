console.log('11111')

require('./index.less');

let arr = [1, 3, 4, 5];

arr.map(item => {
    console.log(item)
});

console.log(arr)

@log
class main {
    constructor() {
        console.log('this is a class')
    }
}

new main();