// 用setTimeout实现setInterval

// 声明变量, 用于获取函数， 目的是为了可以结束函数
myInterval(true);
var func;

function myInterval(flag) {
    if (flag) {
        func = setTimeout(function() {
            myInterval(true);
        }, 1000)
    } else {
        console.log('结束了~~~')
    }
}   