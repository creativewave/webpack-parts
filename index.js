
module.exports = {
    externalize: require('./lib/externalize'),
    extractCss: require('./lib/extractCss'),
    extractFiles: require('./lib/extractFiles'),
    hotModuleReload: require('./lib/hotModuleReload'),
    loadJs: require('./lib/loadJs'),
    loadJsDependencies: require('./lib/loadJsDependencies'),
    serverDev: require('./lib/serverDev'),
    serverRender: require('./lib/serverRender'),
    watch: require('./lib/watch'),
}
