/**
 * Development server.
 * -----------------------------------------------------------------------------
 * Dependencies: webpack-dev-server.
 */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('node:path')

const serverDev = ({ domain = 'localhost', port = 8080, watch } = {}) => ({
    devServer: {
        client: {
            webSocketURL: {
                hostname: domain,
                port,
            },
        },
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html') })],
    watchOptions: require('./watch')(watch).watchOptions,
})

module.exports = serverDev
