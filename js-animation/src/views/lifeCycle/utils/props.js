
/**
 * @file prop
 */
import {hasOwn} from '../shared/util';
export function validateProp(key, propsOptions, propsData, vm) {
    const prop = propOptions[key];
    const absent = !hasOwn(propsData, key);
    let value = propsData[key]
    
}