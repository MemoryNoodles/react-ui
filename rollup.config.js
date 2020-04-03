import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import ignore from 'rollup-plugin-ignore';
// 新增的postcss rollup+PostCSS打包样式文件
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const devConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/cake.development.js',
        format: 'umd',
        name: 'Cake',
        globals: {
            'antd': 'antd',
            'prop-types': 'PropTypes',
            react: 'React',
        },
        sourcemap: true,
    },
    plugins: [
        // 新增的
        postcss({
            extensions: ['.less', '.css'],
            use: [
                ['less', {
                    javascriptEnabled: true
                }]
            ],
            plugins: [autoprefixer, cssnano],
            // inject: false, // dev 环境下的 样式是注入到 js 中的，其他环境不会注入
            // extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
        }),
        nodeResolve({
            // jsnext表示将原来的node模块转化成ES6模块
            jsnext: true,
            // main 和 browser 则决定了要将第三方模块内的哪些代码打包到最终文件中
            main: true,  // Default: true
            browser: true // Default: false
        }),
        commonjs({ exclude: 'src/**' }),// 打包第三方包

        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    // external用来表示一个模块是否要被当成外部模块使用
    external: ['prop-types', 'react','antd'],
};

const productionConfig = {
    input: 'src/index.js',
    output: {
        file: 'dist/cake.production.min.js',
        format: 'umd',
        name: 'Cake',
        globals: {
            antd: 'antd',
            react: 'React',
        },
        sourcemap: true,
    },
    plugins: [
        // 新增的
        postcss({
            extensions: ['.less', '.css'],
            use: [
                ['less', {
                    javascriptEnabled: true
                }]
            ],
            plugins: [autoprefixer, cssnano],
            // extract: 'dist/css/bundle.css' // 输出路径
        }),
        ignore(['prop-types']),
        nodeResolve({
            // jsnext表示将原来的node模块转化成ES6模块
            jsnext: true,
            // main 和 browser 则决定了要将第三方模块内的哪些代码打包到最终文件中
            main: true,  // Default: true
            browser: true // Default: false
        }),
        commonjs({ exclude: 'src/**' }),// 打包第三方包

        babel({
            plugins: ['transform-react-remove-prop-types'],
            exclude: 'node_modules/**',
            runtimeHelpers: true
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        uglify(),
    ],
    // external用来表示一个模块是否要被当成外部模块使用
    external: ['react','antd'],
};

export default [devConfig, productionConfig];
