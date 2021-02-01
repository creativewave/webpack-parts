/**
 * Watch changes on loaded files.
 * -----------------------------------------------------------------------------
 * By default:
 *   1. 100 ms are waited before polling the process working directory again.
 *   2. 200 ms are waited before handling changes.
 *   3. Node modules aren't watched.
 */
const watch = ({
    poll             = 100, // Default: 5007
    aggregateTimeout = 200,
    ignored          = /node_modules/,
} = {}) => ({
    watch: true,
    watchOptions: { aggregateTimeout, ignored, poll },
})

module.exports = watch
