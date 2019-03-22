// 函数节流
// 函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。
var canRun = true;
document.getElementById("throttle").onscroll = function(){
    if(!canRun){
        // 判断是否已空闲，如果在执行中，则直接return
        return;
    }

    canRun = false;
    setTimeout(function(){
        console.log("函数节流");
        canRun = true;
    }, 300);
};


// 函数防抖
// 函数防抖的要点，也是需要一个setTimeout来辅助实现。延迟执行需要跑的代码。
var timer = false;
document.getElementById("debounce").onscroll = function(){
    clearTimeout(timer); // 清除未执行的代码，重置回初始化状态

    timer = setTimeout(function(){
        console.log("函数防抖");
    }, 300);
};  