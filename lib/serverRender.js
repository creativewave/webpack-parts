/**
 * Server render.
 * -----------------------------------------------------------------------------
 * By default:
 *   1. it prevents bundling CSS
 *   2. it prevents code splitting
 */

const fileRule = require('./extractFiles')({ render: false }).module.rules[0]
const jsRule = require('./loadJs')().module.rules[0]
const path = require('path')
const webpack = require('webpack')

// 1
const cssRule = {
    test: /\.(i|p|s)?css$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'css-loader',
            options: {
                modules: {
                    exportOnlyLocals: true,
                    localIdentName: '[name]_[local]_[hash:base64:5]',
                },
            },
        },
        'postcss-loader',
    ],
}

const serverRender = ({ filename = 'render.js', mode = 'production', path: publicPath = '/' } = {}) => ({
    mode,
    name: 'server',
    target: 'node',
    entry: path.resolve('server', filename),
    output: { filename, libraryTarget: 'commonjs2', publicPath },
    module: { rules: [fileRule, cssRule, jsRule] },
    plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })], // 2
})

module.exports = serverRender
