/**
 * Extract CSS.
 * -----------------------------------------------------------------------------
 * Dependencies: css-loader, mini-css-extract-plugin, postcss-loader.
 */

const ExtractPlugin = require('mini-css-extract-plugin')

const extractCss = ({
    chunkFilename = '[id]-[contenthash].css',
    exclude,
    filename = '[name]-[contenthash].css',
    include,
    modules = { localIdentName: '[name]_[local]_[hash:base64:5]' },
} = {}) => ({
    module: { rules: [{
        include,
        exclude,
        test: /\.(i|p|s)?css$/,
        use: [
            { loader: ExtractPlugin.loader },
            { loader: 'css-loader', options: { importLoaders: 1, modules, sourceMap: true } },
            'postcss-loader',
        ],
    }] },
    plugins: [new ExtractPlugin({ chunkFilename, filename })],
})

module.exports = extractCss
