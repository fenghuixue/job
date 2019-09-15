const {getOptions} = require('loader-utils');

module.exports = function(source) {
    let callback = this.async();
    let options = getOptions(this);
    let reg = /debugger(;)?/;
    options.platform === 'production' && (source = source.replace(reg, () => ''));
    return source;
}