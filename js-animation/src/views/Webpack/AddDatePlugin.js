function AddDatePlugin(options) {}

AddDatePlugin.prototype.apply = function(compiler) {
    compiler.plugin('compilation', function(compilation) {
        // compilation.getModule('chunks')
        // compilation.waitForBuildingFinished()
        
    });
}
module.exports = AddDatePlugin;