/**
 * @file 渲染相关
 */
var snabbdom = require('snabbdom');
var h = require('snabbdom/h').default; // helper function for creating vnodes
var patch = snabbdom.init([
    require('snabbdom/modules/class').default,
    require('snabbdom/modules/style').default,
]);
export function initRender(vm) {
    vm._vnode = null;
    vm._staticTrees = null;
    vm._c = h;
    // var container = document.getElementById('container');
    // vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    // const vnode = vm._c('div#container', {on: {click: () => {console.log(11111)}}}, [
    //     h('span', {style: {fontWeight: 'bold'}}, 'This is bold'),
    //     ' and this is just normal text',
    //     h('a', {props: {href: '/foo'}}, 'I\'ll take you places!')
    // ]);
    // console.log(container, vnode)
    // patch(container, vnode)
} 