//  jquery 怎么实现原型
 var jQuery = function(selector) {
     return new jQuery.fn.init(selector); 
 }

 var init = jQuery.fn.init = function (selector) {
     var slice = Array.prototype.slice;
     var dom = slice.call(document.querySelector(selector));

     var i, len = dom ? dom.length : 0;
     for (i = 0 ; i < len; i++) {
         this[i] = dom[i];
     }
     this.length = len;
     this.selector = selector || '';
 } 


//  jquery怎么使用原型

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    css: function(key, value) {

    },
    html: function(value) {
        
    }
}

// 定义原型
init.prototype = jQuery.fn; 

window.$ = $ = jQuery;

// 插件机制
$.fn.getNodeName = function() {
    return this[0].getNodeName; 
}