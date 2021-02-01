/**
 * Extract files.
 * -----------------------------------------------------------------------------
 */

const extractFiles = ({ filename = '[hash][ext][query]' } = {}) => ({
    output: { assetModuleFilename: filename },
    module: {
        rules: [{
            test: /\.(avif|eot|jpe?g|pdf|png|svg|ttf|webp|woff2?)$/,
            type: 'asset/resource',
        }],
    },
})

module.exports = extractFiles
