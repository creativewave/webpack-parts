
function watch({
    aggregateTimeout = 200, // Wait 200ms before recompiling
    ignored = /node_modules/,
    poll = 100, // Wait 100ms between two polls
} = {}) {
    return {
        watch: true,
        watchOptions: { aggregateTimeout, ignored, poll },
    }
}

module.exports = watch
