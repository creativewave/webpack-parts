/**
 * Extract files.
 * -----------------------------------------------------------------------------
 * Dependencies: file-loader.
 */

const extractFiles = ({
    context = 'src',
    emitFile = true,
    filename = '[name].[hash].[ext]',
    test = /\.(eot|jpe?g|pdf|png|svg|ttf|woff|woff2)$/,
} = {}) => ({
    module: { rules: [{
        test,
        loader: 'file-loader',
        options: { context, name: filename, emitFile },
    }] },
})

module.exports = extractFiles
