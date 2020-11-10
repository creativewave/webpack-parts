
# Webpack parts

1. [About](#about)
2. [Installation](#installation)
3. [Configuration](#configuration)

## About

`@cdoublev/wepback-parts` allows to quickly create Webpack configuration(s) using composable parts.

Each part is a function that can be passed an optional configuration object. [`webpack-merge`](https://github.com/survivejs/webpack-merge) is recommended to merge parts.

The configuration options are intentionally minimal, in order to keep a small interface and reduce noise, to only use recommended values, and to fit to `@creativewave` sacred needs. Feel free to fork it!

**Example (`webpack.config.js`)**

```js
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const { merge } = require('webpack-merge')
  const parts = require('@cdoublev/webpack-parts')

  module.exports = merge(
  {
    mode: 'development',
    output: { publicPath: '/' },
    plugins: [new HtmlWebpackPlugin()],
  },
  parts.extractFiles(),
  parts.extractCss(),
  parts.loadJsChunks(),
  parts.serverDev())
```

## Installation

```shell
  npm i @cdoublev/webpack-parts
```

`@cdoublev/webpack-parts` can be safely used in current NodeJS LTS and latest versions.

Some parts have dependencies (Webpack loaders and plugins) listed below, that are not automatically installed.

## Configuration

### `externalize`

| Option | Type     | Default |
| ------ | -------- | ------- |
| keep   | [String] | `[]`    |

`externalize()` excludes all `node_modules` from the bundle, which is recommended for server side script, and `keep` the required module names bundled.

### `extractCss`

| Option        | Type           | Default                                                |
| ------------- | -------------- | ------------------------------------------------------ |
| chunkFilename | String         | `'[name]-[contenthash].[ext]'`                         |
| exclude       | Condition      | `undefined`                                            |
| filename      | String         | `'[name]-[contenthash].[ext]'`                         |
| hmr           | Boolean        | `true`                                                 |
| include       | Condition      | `undefined`                                            |
| modules       | Boolean|Object | `{ localIdentName: '[name]_[local]_[hash:base64:5]' }` |

`extractCss()` resolves CSS files imported in JavaScript files, transpile their PostCSS syntax and features, generates locally scoped CSS class names (CSS modules), and emits the corresponding files into the output directory.

Depends on [`css-loader`](https://github.com/webpack-contrib/css-loader), [`postcss-loader`](https://github.com/webpack-contrib/postcss-loader), and [`mini-css-extract-plugin`](https://github.com/webpack-contrib/https://github.com/webpack-contrib/mini-css-extract-plugin).

Notes:

- you should avoid using `[hash]`, `[chunkhash]`, or `[contenthash]` for `filename` and `chunkFilename` to get hot module replacement
- CSS modules couldn't be hot reloaded yet (see [this issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/519))

### `extractFiles`

| Option   | Type   | Default                        |
| -------- | ------ | ------------------------------ |
| context  | String | `'src'`                        |
| filename | String | `'[name]-[contenthash].[ext]'` |

`extractFiles()` resolves multimedia files (images, fonts, pdf, etc...) imported from other files, and creates them into the output directory.

Depends on [`file-loader`](https://github.com/webpack-contrib/file-loader).

### `hotModuleReload`

`hotModuleReload()` enables [hot module replacement](https://webpack.js.org/plugins/hot-module-replacement-plugin/).

**Note:** it's automatically enabled with `serverDev()`.

### `loadJs`

| Option  | Type      | Default          |
| ------- | --------- | ---------------- |
| include | Condition | `undefined`      |
| exclude | Condition | `/node_modules/` |

`loadJs()` resolves JavaScript files defined as entry points or imported in other JavaScript files, transpiles their syntax with `babel`, extracts the Webpack runtime into a single chunk, and split the bundle into multiple chunks to speed up their loading via HTTP/2.

Depends on [`babel-loader`](https://github.com/babel/babel-loader).

### `serverDev`

| Option | Type    | Default       |
| ------ | ------- | ------------- |
| https  | Boolean | `false`       |
| domain | String  | `'localhost'` |
| port   | Number  | `8080`        |
| path   | String  | `'/'`         |
| proxy  | String  | `undefined`   |

`serverDev()` runs an HTTP server to request your bundled files, by default via `http://localhost:8080`, with hot module replacement enabled.

Note: `serverDev()` uses defaults `watch()` options.

Depends on [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server/).

### `serverRender`

| Option     | Type   | Default       |
| ---------- | ------ | ------------- |
| filename   | String | `'render.js'` |
| publicPath | String | `'/'`         |

`serverRender()` bundles a JavaScript entry into a single chunk excluding all CSS and multimedia files.

This entry file should be located in a `server` directory at the root of your project. It's mostly meant to render the HTML of a JavaScript application on the server, before executing (hydrating) it client side.

### `watch`

| Option           | Type      | Default          |
| ---------------- | --------- | ---------------- |
| poll             | Boolean   | `true`           |
| aggregateTimeout | Number    | `300`            |
| ignored          | Condition | `/node_modules/` |

`watch()` enables files watching and automatic recompilation on change.
