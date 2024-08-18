
# Webpack parts

1. [About](#about)
2. [Installation](#installation)
3. [Configuration](#configuration)

## About

`@cdoublev/wepback-parts` simplifies creating common Webpack configurations.

It exposes functions taking an optional object of a minimal set of parameters with sane default values, returning one or more parts of a Webpack configuration (to merge with [`webpack-merge`](https://github.com/survivejs/webpack-merge)).

**Example (`webpack.config.js`)**

```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const { merge } = require('webpack-merge')
  const parts = require('@cdoublev/webpack-parts')

  module.exports = merge(
    { mode: 'development' },
    parts.extractFiles(),
    parts.extractCss(),
    parts.loadJs(),
    parts.serve())
```

## Installation

```shell
  npm i @cdoublev/webpack-parts
```

`@cdoublev/webpack-parts` can be safely used with Webpack v5 in the active LTS version of NodeJS.

## Configuration

### buildRender

| Option | Default |
| ------ | ------- |
| [filename](https://webpack.js.org/configuration/output/#outputfilename) | `'render.js'` |
| [mode](https://webpack.js.org/configuration/mode/) | `'production'` |

`buildRender()` bundles a JavaScript entry point and imported modules without CSS assets. This entry point should be located in a `server` directory at the root of the project.

It is intented for bundling a server or static render script.

### externalize

| Option | Default |
| ------ | ------- |
| keep   | `[]`    |

`externalize()` excludes all native and installed modules from the bundle but `keep` the given module names.

It is intended for bundling a server application that will import externalized modules with `require()`.

### extractCss

| Option | Type | Default |
| ------ | ---- | ------- |
| [chunkFilename](https://github.com/webpack-contrib/mini-css-extract-plugin#chunkFilename) | `'[name]-[contenthash].[ext]'` |
| [exclude](https://webpack.js.org/configuration/module/#ruleexclude) | `undefined` |
| [filename](https://github.com/webpack-contrib/mini-css-extract-plugin#filename) | `'[name]-[contenthash].[ext]'` |
| [include](https://webpack.js.org/configuration/module/#ruleinclude) | `undefined` |
| [modules](https://github.com/webpack-contrib/css-loader#modules) | `{ localIdentName: '[name]_[local]_[hash:base64:5]' }` |

`extractCss()` resolves CSS files imported in JavaScript files, transpiles their PostCSS syntax and features, generates locally scoped CSS class names (CSS modules), and emits the corresponding files into the output directory.

**Note:** hot module replacement requires not defining `filename` and `chunkFilename` using `[hash]`, `[chunkhash]`, or `[contenthash]`.

### extractFiles

| Option   | Type     | Default                |
| -------- | -------- | ---------------------- |
| filename | `String` | `'[hash][ext][query]'` |

`extractFiles()` resolves multimedia files (images, fonts, pdf) imported from other files, and creates a copy in the output directory.

### hotModuleReload

`hotModuleReload()` enables [hot module replacement](https://webpack.js.org/plugins/hot-module-replacement-plugin/).

It is automatically enabled with `serve()` (`webpack-dev-server`) therefore it is intented to be used in the client configuration of a server side rendered application.

### loadJs

| Option | Default |
| ------ | ------- |
| [include](https://webpack.js.org/configuration/module/#ruleinclude) | `undefined` |
| [exclude](https://webpack.js.org/configuration/module/#ruleexclude) | `undefined` |

`loadJs()` forwards the JavaScript entry points and imported modules to `babel`, so that it transpiles the syntax and polyfills the interfaces.

`loadJs()` also gathers common modules into a single `common.js` file, and extracts the Webpack runtime into a separate `runtime.js` file.

### serve

| Option | Default |
| ------ | ------- |
| [domain]https://webpack.js.org/configuration/dev-server/#websocketurl (hostname) | `'localhost'` |
| [port](https://webpack.js.org/configuration/dev-server/#devserverport) | `8080` |
| [watch](https://webpack.js.org/configuration/watch/#watchoptions) | [watch](#watch) |

`serve()` runs an HTTP server serving the bundled application loaded in `src/index.html` with hot module replacement enabled.

### watch

| Option | Default |
| ------ | ------- |
| [poll](https://webpack.js.org/configuration/watch/#watchoptionspoll) | `200` |
| [aggregateTimeout](https://webpack.js.org/configuration/watch/#watchoptionsaggregatetimeout) | `200` |
| [ignored](https://webpack.js.org/configuration/watch/#watchoptionsignored) | `/node_modules/` |

`watch()` enables files watching and automatic recompilation on change.
