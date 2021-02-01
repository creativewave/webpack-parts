/**
 * Development server.
 * -----------------------------------------------------------------------------
 * Dependencies: webpack-dev-server.
 */

const hotModuleReload = require('./hotModuleReload')

const serverDev = ({
    https = false,
    domain = 'localhost',
    port = '8080', // Note: listening on ports < 1024 requires sudo privilege.
    path = '/',
    proxy,
    watch,
} = {}) => ({
    devServer: {
        https,
        host: '0.0.0.0', // Universal access from localhost or VM host.
        port,
        public: `${domain}:${port}`, // Universal access from localhost or VM host.
        publicPath: `${https ? 'https' : 'http'}://${domain}:${port}${path}`, // Required for HMR.
        proxy,
        compress: true,
        hot: true,
        historyApiFallback: true,
        overlay: true,
        watchOptions: require('./watch')(watch).watchOptions,
    },
    ...hotModuleReload(),
})

module.exports = serverDev
