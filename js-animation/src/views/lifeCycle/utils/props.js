
/**
 * @file prop
 */
import {hasOwn, isObject, hyphenate} from '../shared/util';

export function validateProp(key, propsOptions, propsData, vm) {
    const prop = propsOptions[key];
    const absent = !hasOwn(propsData, key);
    let value = propsData[key]
    // 处理Boolean类型的props
    const booleanIndex = getTypeIndex(Boolean, prop.type)
    if (booleanIndex > -1) {
        if (absent && !hasOwn(prop, 'default')) {
            value = false;
        } else if (value === '' || value === hyphenate(key)) {
            const stringIndex = getTypeIndex(String, prop.type);
            if (stringIndex < 0 || booleanIndex < stringIndex) {
                value = true;
            }
        }
    }
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
        // const prevShouldObserve = shouldObserve;
        // toggleObserving(true);
        // observe(value);
        // toggleObserving(prevShouldObserve);
    }
    if (process.env.NODE_ENV !== 'production') {
        // assertProp(prop, key, value, vm, absent)
    }
    
}
function getPropDefaultValue(vm, prop, key) {
    if (!hasOwn(prop, 'default')) {
        return undefined;
    }
    const def = prop.default;
    if (process.env.NODE_ENV !== 'production' && isObject(def)) {
        console.error('Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm)
    }
    if (vm && vm.$options.propsData
        && vm.$options.propsData[key] === undefined 
        && vm._props[key] !== undefined
    ) {
        return vm._props[key];
    }

    return typeof def === 'function' && getType(prop.type) !== 'Function'
        ? def.call(vm)
        : def
}

function getTypeIndex (type, expectedTypes) {
    if (!Array.isArray(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1
    }
    for (let i = 0, len = expectedTypes.length; i < len; i++) {
      if (isSameType(expectedTypes[i], type)) {
        return i
      }
    }
    return -1
}

function isSameType(a, b) {
    return getType(a) === getType(b)
}

function getType(fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match ? match[1] : '';
}
