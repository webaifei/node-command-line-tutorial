# 使用node构建命令行教程

1. 使用npm包的机制实现命令行工具
```
//package.json
"bin": {
  "your_commond_name": "your_real_command_file"
}
//use npm link to make the command globally
npm link
```
2. 解析命令行参数
    1. commander
    2. yargs
3. co co-prompt 读取用户输入
4. chalk 设置我们输出的颜色
5. progress 进度条

参考：
1. [阮一峰 Node.js 命令行程序开发教程](http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html)
2. [需要翻墙 使用node构建命令行工具](https://developer.atlassian.com/blog/2015/11/scripting-with-node/)