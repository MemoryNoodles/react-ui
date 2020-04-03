const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const sourceDirectory = path.resolve(__dirname, 'src');
const styleDirectory = path.resolve(__dirname, 'style');
const targetDirectory = path.resolve(__dirname, 'lib');

const isDev = process.env.NODE_ENV !== 'production';

const plugins = [
    new ExtractTextPlugin('app-[contenthash:8].css'),
    new webpack.optimize.ModuleConcatenationPlugin(),
];

if (!isDev) {
    plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }));
    plugins.push(
        new UglifyJsPlugin({ //压缩js
            uglifyOptions: {
                comments: false, //去掉注释
                compress: {
                    warnings: false //去掉警告(一定去掉，占用体积大)
                }
            },
            sourceMap: false,
        }),
    );
}

module.exports = {
    context: sourceDirectory,
    entry: {
        cake: './index.js',
    },
    output: {
        path: targetDirectory,
        filename: '[name].min.js',
        hashDigestLength: 8,
    },
    devServer: {
        hot: true,
        contentBase: [sourceDirectory, styleDirectory],
        watchContentBase: true,
        open: true,
        port: 8000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test:  /\.(less|css)$/,
                //而且要include，而且要注意一下/node_modules/antd这个路径是否正确
                // include: path.join(__dirname, 'node_modules/antd'),
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader'],
                }),
            },
            {
                test: /\.(eot|woff|woff2|ttf)/,
                loader: "url-loader?limit=30000&name=fonts/[hash:8].[name].[ext]"
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                ],
            },
        ],
    },
    devtool: isDev ? 'cheap-source-map' : false,
    resolve: {
        alias: {
            'cake': path.resolve(__dirname),
        },
        extensions: ['.js', '.jsx', '.less'], //后缀名自动补全
    },
    plugins,
};
