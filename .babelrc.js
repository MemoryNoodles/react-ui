'use strict';

const target = process.env.BABEL_TARGET;
const output = process.env.BABEL_OUTPUT;
const modules = output == null ? false : output;

const options = {
    compact: false,
    presets: [['@babel/env', { loose: true, modules }], '@babel/react'],
    plugins: [
        '@babel/proposal-object-rest-spread',
        ['@babel/proposal-class-properties', { loose: true }],
        // ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": true}],
        // "syntax-dynamic-import",
    ],
};

console.log("target：",target)
if (target === 'examples'||target === 'src') {
    options.plugins.push(['transform-react-remove-prop-types', { removeImport: true }]);
} else {
    options.plugins.push(['transform-react-remove-prop-types', { mode: 'wrap' }]);
}

module.exports = options;
