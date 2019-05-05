// // 函数节流
// // 函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。
// var canRun = true;
// document.getElementById("throttle").onscroll = function(){
//     if(!canRun){
//         // 判断是否已空闲，如果在执行中，则直接return
//         return;
//     }

//     canRun = false;
//     setTimeout(function(){
//         console.log("函数节流");
//         canRun = true;
//     }, 300);
// };

// function fn() {
//     console.log('节流')
// }
// function throttle(fn, wait) {
//     let flag = true;
//     return function() {
//         if (!flag) return;
//         flag = false;
//         setTimeout(function() {
//             fn();   
//             flag = true;
//         }, wait)
//     }
// }
// window.addEventListener('click', throttle(fn, 500));

// function debounce(fn, wait) {
//     let timer;
//     return function() {
//         console.log('timer', timer)
//         if (timer) clearTimeout(timer);
//         timer = setTimeout(() => {
//             fn();
//         }, wait); 
//     }   
    
// }
// function fn() {
//     console.log('防抖')
// }
// window.addEventListener('click', debounce(fn, 500));

// window.addEventListener('scroll', fn);

// 函数防抖
// 函数防抖的要点，也是需要一个setTimeout来辅助实现。延迟执行需要跑的代码。
// var timer = false;
// document.getElementById("debounce").onscroll = function(){
//     clearTimeout(timer); // 清除未执行的代码，重置回初始化状态
//     timer = setTimeout(function(){
//         console.log("函数防抖");
//     }, 300);
// };  