let num = 4;
let p = new Promise(function(resolve, reject){
    setTimeout(function(){
        if(num <= 5){
            resolve(num);
        } else{
            reject('数字太大了');
        }
    }, 4000);
});
console.log('p-------', p)
let p2 = p.then(res => {
    return new Promise(function(resolve, reject) { 
        try {
            x();
            resolve('返回值---resolve');
        } catch {
            reject('返回值---reject');
        }
    });
}, error => {
    console.error(error)
});
console.log('p2-------', p2)
let p3 = p2.catch(error => {
    console.error(error)
});
// console.log('p3-------', p3)

// let p4 = p3.then(res => {
//     console.log(res)
// }, error => {
//     console.error(error)
// }).finally(res => {
//     console.log('finally----')
// });

