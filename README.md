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



