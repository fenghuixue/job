// async await

async function demo1() {
    let a = await demo2(1);
    let b = await demo2(2);
    let c = await demo2(3);
    let result = a + b + c;
    console.log('result: ' + result);
}

function demo2(value) {
    console.log('demo2 run, ' + value)
    return value;
}

let asyncFunc = demo1();
console.log('asyncFunc', asyncFunc)

// use promise and generate 
// function spawn(genF) {
//     // 返回一个promise
//     return new Promise(function(resolve, reject) {
//         const gen = genF();
//         function step(nextF) {
//             let next;
//             try {
//                 next = nextF();

//             } catch(e) {
//                 reject(e);
//             }
//             if (next.done) {
//                 return resolve(next.value);
//             }
//             Promise.resolve(next.value).then(
//                 function(v) {
//                     step(function() {
//                         return gen.next(v);
//                     });
//                 },
//                 function(e) {
//                     step(function() {
//                         return gen.throw(e);
//                     });
//                 }
//             );
//         }
//         step(function() {
//             return gen.next(undefined);
//         });
//     })
// }


