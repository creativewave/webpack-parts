
const fileRule = require('./extractFiles.js')().module.rules[0]
const jsRule = require('./loadJs.js')().module.rules[0]
const webpack = require('webpack')

// Exclude CSS from the bundle
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

function buildRender({ filename = 'render.js', mode = 'production' } = {}) {
    return {
        mode,
        name: 'server',
        target: 'node',
        entry: `./server/${filename}`,
        output: { filename, libraryTarget: 'commonjs2' },
        module: { rules: [fileRule, cssRule, jsRule] },
        // Prevent code splitting
        plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })],
    }
}

module.exports = buildRender
