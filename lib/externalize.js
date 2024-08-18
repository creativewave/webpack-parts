
function externalize({ keep = [] } = {}) {
    return {
        externals({ context, request }, callback) {
            if (context.includes('node_modules') || request.includes('node_modules') || !/^[/.]/.test(request)) {
                let moduleName
                if (request.startsWith('/')) {
                    [, moduleName] = request.match(/node_modules\/((@[^/]+\/)?[^/]+)/)
                } else if (request.startsWith('.')) {
                    [, moduleName] = context.match(/node_modules\/((@[^/]+\/)?[^/]+)/)
                } else if (request.startsWith('@')) {
                    moduleName = request.split('/', 2).slice(0, 2).join('/')
                } else {
                    ([moduleName] = request.split('/'))
                }
                if (!keep.includes(moduleName)) {
                    return callback(null, request)
                }
            }
            callback()
        },
        externalsPresets: { node: true },
        externalsType: 'commonjs',
    }
}

module.exports = externalize
