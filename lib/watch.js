/**
 * Watch changes on loaded files.
 * -----------------------------------------------------------------------------
 * By default:
 *   1. Network and Vagrant Box File Systems are polled.
 *   2. 300 ms are waited before handling changes.
 *   3. Node modules aren't watched.
 */
const watch = ({
    poll             = true,
    aggregateTimeout = 300,
    ignored          = /node_modules/,
} = {}) => ({
    watch: true,
    watchOptions: { aggregateTimeout, ignored, poll },
})

module.exports = watch
