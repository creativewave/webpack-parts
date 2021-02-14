/**
 * Load JS dependencies.
 * -----------------------------------------------------------------------------
 * Dependencies: babel-loader, @babel/preset-env, @babel/runtime,
 * @babel/plugin-transform-runtime.
 */

const loadJsDependencies = () => ({
    module: { rules: [{
        test: /\.(c|m)?jsx?$/,
        include: /node_modules/,
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            plugins: ['@babel/plugin-transform-runtime'],
            presets: ['@babel/preset-env'],
        },
    }] },
})

module.exports = loadJsDependencies
