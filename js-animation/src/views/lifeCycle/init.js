/**
 * @file init
 */
import { initLifecycle, callHook } from "./lifecycle";
import {initEvents} from './events';
import {initRender} from './render';

export function initMixin(myVue) {
    myVue.prototype._init = function (options) {
        const vm = this;
        vm._isVue = true;

        // vm.$options = mergeOptions({

        // })
        initLifecycle(vm);
        initEvents(vm);
        initRender(vm);
        callHook(vm, 'beforeCreate');
        // initInjections(vm);
        // initState(vm);
        // initProvide(vm);
        // callHook(vm, 'created');

    }
}