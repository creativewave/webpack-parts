/**
 * Development server.
 * -----------------------------------------------------------------------------
 * Dependencies: webpack-dev-server.
 */

const serverDev = ({ domain = 'localhost', port = 8080, watch } = {}) => ({
    devServer: {
        client: {
            webSocketURL: {
                hostname: domain,
                port,
            },
        },
    },
    watchOptions: require('./watch')(watch).watchOptions,
})

module.exports = serverDev
