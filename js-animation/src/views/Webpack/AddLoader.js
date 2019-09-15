const { getOptions } = require('loader-utils');

module.exports = function loader(source) {
    console.log(getOptions(source))
    return source;
}