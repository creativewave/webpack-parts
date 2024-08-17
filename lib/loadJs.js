/**
 * Load JS.
 * -----------------------------------------------------------------------------
 * Dependencies: babel-loader.
 * By default:
 *   1. it extracts the Webpack runtime
 *   2. it extracts vendor modules and modules shared between all chunks
 */

const loadJs = ({ include, exclude } = {}) => ({
    module: { rules: [{
        test: /\.(c|m)?jsx?$/,
        include,
        exclude,
        use: 'babel-loader',
    }] },
    optimization: {
        runtimeChunk: 'single', /* 1 */
        splitChunks: { chunks: 'all', name: 'common' }, /* 2 */
    },
})

module.exports = loadJs
