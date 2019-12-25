// step1 读取当前目录下的package.json
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var packageContent = require('./package.json');
var devDeps = packageContent.devDependencies;
var deps = packageContent.dependencies
var packgeFile = 'package.json';
var packgeBakFile = 'package.json.bak';

// step3 删除@u51 依赖
Object.keys(devDeps).forEach(function (dep) {
    if(/^@u51/.test(dep)) {
        delete devDeps[dep];
    }
})

Object.keys(deps).forEach(function (dep) {
    if(/^@u51/.test(dep)) {
        delete deps[dep];
    }
})

// step2 备份
fs.copyFileSync(path.join(__dirname, packgeFile), path.join(__dirname, packgeBakFile));
// step4 生成新的package.json
fs.writeFileSync(path.join(__dirname, packgeFile), JSON.stringify(packageContent), 'utf-8');

// step5 执行npm i --registry=http://npm.u51-inc.com/
if(shell.exec('npm i') == 0) {
    // step6 恢复package.json 执行 npm i
    fs.copyFileSync(path.join(__dirname, packgeBakFile), path.join(__dirname, packgeFile));
    if(shell.exec('npm i --registry=http://npm.u51-inc.com/') == 0) {
        shell.echo('Nice! Everything is ok!');
    }
}

