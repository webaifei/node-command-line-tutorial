#!/usr/bin/env node
// step1 读取当前目录下的package.json
var fs = require('fs');
var path = require('path');
var shell = require('shelljs');

var workdir = process.cwd();
var packageContent = require(path.join(workdir, './package.json'));
var devDeps = packageContent.devDependencies;
var deps = packageContent.dependencies
var packgeFile = 'package.json';
var packgeBakFile = 'package.json.bak';
shell.exec('==========开始处理package.json文件=========');
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
shell.exec('==========备份package.json文件=========');
// step2 备份
fs.copyFileSync(path.join(workdir, packgeFile), path.join(workdir, packgeBakFile));
shell.exec('==========生成新的package.json文件=========');
// step4 生成新的package.json
fs.writeFileSync(path.join(workdir, packgeFile), JSON.stringify(packageContent), 'utf-8');

shell.exec('==========安装非u51依赖=========');
// step5 执行npm i --registry=http://npm.u51-inc.com/
if(shell.exec('npm i') == 0) {
    // step6 恢复package.json 执行 npm i
    shell.exec('==========添加u51依赖=========');
    fs.copyFileSync(path.join(workdir, packgeBakFile), path.join(workdir, packgeFile));
    shell.exec('==========安装u51依赖=========');
    if(shell.exec('npm i --registry=http://npm.u51-inc.com/') == 0) {
        shell.echo('Nice! Everything is ok!');
    }
}

