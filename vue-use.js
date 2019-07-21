/**
 * @description vue.use 用于安装vue插件
 * @params {Object | Function} plugins
 */

Vue.use = function(plugin) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
        return this;
    }

    const args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
} 