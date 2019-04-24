function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
        continue;
    }
    return Promise.reject('111')
}

sleep(5).catch((res) => {
    console.error(res);
});


let sleep1 = function (delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(111);
        }, delay)
    });
    
};
sleep1(false).catch(err => {
    console.log(err)
})

// promise的基本用法

function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(reject, duration);
    })
}

sleep(1000).catch(() => {
    console.error('111')
});



