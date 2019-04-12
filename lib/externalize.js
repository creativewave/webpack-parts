/**
 * Externals.
 * -----------------------------------------------------------------------------
 */

const fs = require('fs')
const path = require('path')

const externalize = ({ keep = [] } = {}) => {
    const regexp = new RegExp(`${keep.join('|')}`)
    return {
        externals: fs.readdirSync(path.resolve('node_modules')).reduce(
            (externals, mod) => {
                if (regexp.test(mod)) {
                    return externals
                }
                externals[mod] = `commonjs ${mod}`
                return externals
            },
            {}),
    }
}

module.exports = externalize
