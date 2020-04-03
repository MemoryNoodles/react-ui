# cake-UI
尝试创建前端UI组件库

# rollup.config.js说明
作用是导出组件的外链版本，供在HTML中通过srcipt:src方式引入
在配置中可以通过修改output.name指定组件对外暴露的变量名

# webpack.config.js
作用是通过npm start运行本地开发时的一些配置
在配置中可以通过resolve.alias指定npm包名


执行npm run build会构建出组件代码，用于上传NPM，目录如下，其他style源代码也是生产代码
├── dist                    // 产物外链版本(HTML引入)
├── esm                     // 产物ES6版本
├── lib                     // 产物ES5版本
└── style                   // 源代码样式

在package.json中已经配置好入口：
"main": "lib/index.js",		// 一般情况下的主入口
"module": "esm/index.js"	// 提案，用于引入ES Module的入口


本地开发测试和测试脚本 测试对组件开发来说是非常必要的:
本例中可以在example中可以直接通过import方式引入正在开发的组件，进行本地测试 在example/app.js引入组件
import 'react-component-template/style/component.css';// eslint-disable-line
import Block from 'react-component-template/src'; // eslint-disable-line


测试框架使用的是Jest,可以在每级目录的__test__目录下编写对接的测试文件，执行npm run test命令即可得到测试结果;
代码覆盖率报告使用的codecov, 如果你的工程上传到github，并配置好travis CI，可以通过codecov上传测试报告

#发布NPM包时可以在package.json中指定files字段，其中包含的文件夹和文件将会被发布到NPM上



# react-component-template使用说明

Github地址：[react-component-template](https://github.com/58-magic/react-component-template)

> 占位符号说明：工程中有两个占位符`react-component-template`(NPM引用名)和`ReactComponentTemplate`(变量引用名)，如果你的工程是通过`yo react-component-magic`生成的，这两个占位可能已经被自定义的名称替换了，参看`package.json`的`name`字段

# 工程结构

```
├── LICENSE
├── README.md
├── dist                    // 产物外链版本
├── esm                     // 产物ES6版本
├── examples                // 示例代码
├── lib                     // 产物ES5正常版本
├── node_modules
├── package-lock.json
├── package.json
├── rollup.config.js
├── src                     // 源代码
├── style                   // 源代码样式
└── webpack.config.js
```

# 使用说明
- 产出三种格式的代码：
    + `dist`: 外链版本，通过`script`标签引入
    + `esm`: es6语法版本
    + `lib`: es5语法常用版本

- style独立放置
    + 可仅提供`.css`，也可以额外提供`.less`和`.scss`

- 命令
    + `npm run build`: 构建产物
    + `npm run start`: 本地启动，默认端口`8000`
        - `examples`中按照引用包的方式引用了`react-component-template`组件，在`webpack.config.js`中按照如下配置
          ```
          resolve: {
            alias: {
              'react-component-template': path.resolve(__dirname),
            },
          },
          ```
    + `npm run format`: 格式化
    + `npm run lint`: 代码校验，配置规则在`.eslintrc`中
    + `npm run test`: 运行测试用例
        - 测试用例语法参考：[Jest](https://facebook.github.io/jest/)

- 在`examples/dist`目录下启动服务
    + `serve`需要通过npm全局安装
        ```
            npm i -g serve
            serve -s examples/dist
        ```

- 修改项
    > 如果工程是通过`yo react-component-magic`生成的，可忽略本段内容
    1. `package.json`中所有与仓库信息相关的字段，包含`name`、`repository`、`bugs`、`homepage`
    1. `rollup.config.js`中`output`相关字段：`file`、`name`
        - `ReactComponentTemplate`是通过`script:src`引入方式时对外暴露的组件名
    1. `webpack.config.js`中`resolve.alias`字段
    1. `examples`示例中的相关字段







