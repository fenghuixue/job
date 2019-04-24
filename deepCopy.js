var deepCopy = function(obj) {
    // 这儿有个坑，typeof null 也为'object'
    if (typeof obj !== 'object' || obj === null) return obj;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] == 'object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}