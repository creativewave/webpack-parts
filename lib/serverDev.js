/**
 * Development server.
 * -----------------------------------------------------------------------------
 * Dependencies: webpack-dev-server.
 */

const serverDev = ({
    https = false,
    domain = 'localhost',
    port = '8080', // Note: listening on ports < 1024 requires sudo privilege.
    path: publicPath = '/',
    proxy,
    watch,
} = {}) => ({
    devServer: {
        https,
        host: '0.0.0.0', // Universal access from localhost or VM host.
        port,
        public: `${domain}:${port}`, // May be required when using proxies.
        publicPath,
        proxy,
        compress: true,
        hot: true,
        historyApiFallback: true,
        overlay: true,
        watchOptions: require('./watch')(watch).watchOptions,
    },
})

module.exports = serverDev
