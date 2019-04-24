// 首先是两个核心函数

var container = document.getElementById('container');
var node = h('ul#list', {}, [h('li.item', {}, 'item1'), h('li.item', {}, 'item2')]);
patch(container, vnode);



