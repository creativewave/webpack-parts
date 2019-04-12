/**
 * Hot Module Reload.
 * -----------------------------------------------------------------------------
 */

const webpack = require('webpack')

const hotModuleReload = () => ({
    plugins: [new webpack.HotModuleReplacementPlugin()],
})

module.exports = hotModuleReload
