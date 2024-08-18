
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('node:path')

function serve({ domain = 'localhost', port = 8080, watch } = {}) {
    return {
        devServer: {
            client: {
                webSocketURL: {
                    hostname: domain,
                    port,
                },
            },
        },
        plugins: [new HtmlWebpackPlugin({ template: path.resolve('src', 'index.html') })],
        watchOptions: require('./watch.js')(watch).watchOptions,
    }
}

module.exports = serve
