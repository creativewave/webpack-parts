
function loadJs({ include, exclude } = {}) {
    return {
        module: {
            rules: [{
                test: /\.[cm]?js$/,
                include,
                exclude,
                use: 'babel-loader',
            }],
        },
        optimization: {
            // Extract Webpack runtime
            runtimeChunk: 'single',
            // Extract modules shared between all chunks and vendor modules
            splitChunks: { chunks: 'all', name: 'common' },
        },
    }
}

module.exports = loadJs
