
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj, key) {
    return hasOwnProperty.call(obj, key);
}

export function isObject(obj) {
    return obj !== null && typeof obj === 'object'
}

var hyphenateRE = /\B([A-Z])/g;
export const hyphenate = function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
};
