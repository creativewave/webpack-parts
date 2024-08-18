
const webpack = require('webpack')

function hotModuleReload() {
    return { plugins: [new webpack.HotModuleReplacementPlugin()] }
}

module.exports = hotModuleReload
