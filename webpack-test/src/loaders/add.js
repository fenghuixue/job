const {getOptions} = require('loader-utils');

module.exports = function loader(source) {
    console.log(getOptions(this), source)
    process.exit();
    return source;
}