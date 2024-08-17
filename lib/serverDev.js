/**
 * Development server.
 * -----------------------------------------------------------------------------
 * Dependencies: webpack-dev-server.
 */

const serverDev = ({
    domain = 'localhost',
    port = 8080,
    path: publicPath = '/',
    watch,
} = {}) => ({
    devServer: {
        client: {
            webSocketURL: {
                hostname: domain,
                port,
            },
        },
        devMiddleware: { publicPath },
    },
    watchOptions: require('./watch')(watch).watchOptions,
})

module.exports = serverDev
