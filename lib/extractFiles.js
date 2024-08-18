
function extractFiles({ filename = '[hash][ext][query]' } = {}) {
    return {
        output: { assetModuleFilename: filename },
        module: {
            rules: [{
                test: /\.(avif|eot|jpe?g|pdf|png|svg|ttf|webp|woff2?)$/,
                type: 'asset/resource',
            }],
        },
    }
}

module.exports = extractFiles
