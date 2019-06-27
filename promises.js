let num = 300;
let urls = new Array(300).fill(1);
let promises = urls.map((item, index) => {
    return function() {
        console.log('开始执行----:', index)
        return new Promise((resolve, reject) =>{
            let time = Math.floor(Math.random()*20+1) + 1;
            setTimeout(function() {
                console.log('执行完成---: ', index)
                resolve()
            }, time);
        })
    }        
});
let doNum = 0;
let arr = [];
let max = 50;
let target = promises[0];
for (let i = 0; i < max; i++) {
    doPromise(promises[i]);
}
function doPromise(target) {
    promises.shift();
    target().then(() => {
        doNum++;
        if (promises.length) {
            doPromise(promises[0])
        }
        if (doNum == num) {
            console.log('执行完成： all')
        }
    });
}

