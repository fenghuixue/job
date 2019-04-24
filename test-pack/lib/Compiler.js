let fs = require('fs');
let path = require('path');
let ejs = require('ejs')
// babylon 源码 => ast
// @babel/traverse
// @babel/types
// @babel/generator
let babylon = require('babylon');
let traverse = require('@babel/traverse').default;
let t = require('@babel/types');
let generator = require('@babel/generator').default;
class Compiler {
    constructor(config) {
        // entry webpack.config.js的路径
        this.config = config;
        this.entryId;
        this.modules = {}
        this.entry = config.entry;
        // 当前的路径
        this.root = process.cwd();
    }
    getSource(modulePath) {
        // 获取当前路径下 文件所有路径
        let contents = fs.readFileSync(modulePath , 'utf8');
        return contents;
    }
    parse(source, parentPath) {
        console.log(source, parentPath);
        // babylon生成ast
        let ast = babylon.parse(source);
        let dependencies = [];
        //  抽象语法树解析 https://astexplorer.net/
        traverse(ast, {
            CallExpression(p) {
                let node = p.node;
                if (node.callee.name === 'require') {
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value;
                    moduleName = moduleName + (path.extname(moduleName) ? '': '.js');
                    moduleName = './' + path.join(parentPath, moduleName);
                    // 生成依赖文件
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];

                }
            }
        })
        // generator code
        let sourceCode = generator(ast).code;
        return {sourceCode, dependencies};
    }
    buildMuodules(modulePath, isEntry) {
        let source =  this.getSource(modulePath);
        let moduleName = './' + path.relative(this.root, modulePath);
        if (isEntry) {
            this.entryId = modulePath;
        }
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName));
        console.log(sourceCode, dependencies)

        this.modules[moduleName] = sourceCode;
        // 递归子文件的依赖， 拿到所有的require关系，并存放在 this.modules中
        dependencies.forEach(dep => {
            this.buildMuodules(path.join(this.root, dep), false);
        })  
    }
    emitFile() {
        //  输出路径
        let main = path.join(this.config.output.path, this.config.output.filename);
        // 模板路径
        let templateStr = this.getSource(path.join(__dirname, 'main.ejs'));
        // ejst根据渲染模板main.ejs将this.modules 生成code
        let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules})
        this.assets = {}
        this.assets[main] = code;
        // 将code写在输出文件main.js中
        fs.writeFileSync(main, this.assets[main]);
    }
    run() {
        // 创建模块的依赖关系
        this.buildMuodules(path.resolve(this.root, this.entry), true)
        console.log(this.modules, this.entryId);
        // 发射一个文件 打包后的文件
        this.emitFile();

    }
}

module.exports = Compiler;