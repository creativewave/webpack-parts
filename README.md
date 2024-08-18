
# Webpack parts

1. [About](#about)
2. [Installation](#installation)
3. [Configuration](#configuration)

## About

`@cdoublev/wepback-parts` allows to quickly create a Webpack 5 configuration using composable parts.

Each part is a function that can be passed an optional configuration object. [`webpack-merge`](https://github.com/survivejs/webpack-merge) is recommended to merge parts.

The configuration parameters are all optional and intentionally minimal in order to keep a simple interface, and are assigned the recommended default values.

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

`@cdoublev/webpack-parts` can be safely used with Webpack v5 in current NodeJS versions.

## Configuration

### `externalize`

| Option | Type       | Default |
| ------ | ---------- | ------- |
| keep   | `[String]` | `[]`    |

`externalize()` excludes all native and installed modules from the bundle but `keep` some module names.

It is intended to be used in a configuration to bundle a server application, which will import externalized modules with `require()`.

### `extractCss`

| Option        | Type             | Default                                                |
| ------------- | ---------------- | ------------------------------------------------------ |
| chunkFilename | `String`         | `'[name]-[contenthash].[ext]'`                         |
| exclude       | `Condition`      | `undefined`                                            |
| filename      | `String`         | `'[name]-[contenthash].[ext]'`                         |
| hmr           | `Boolean`        | `true`                                                 |
| include       | `Condition`      | `undefined`                                            |
| modules       | `Boolean|Object` | `{ localIdentName: '[name]_[local]_[hash:base64:5]' }` |

`extractCss()` resolves CSS files imported in JavaScript files, transpile their PostCSS syntax and features, generates locally scoped CSS class names (CSS modules), and emits the corresponding files into the output directory.

**Notes:**

- you should avoid using `[hash]`, `[chunkhash]`, and `[contenthash]`, for `filename` and `chunkFilename`, in order to get hot module replacement
- hot CSS module replacement is currently not supported by `mini-css-extract-plugin` (see [this issue](https://github.com/webpack-contrib/mini-css-extract-plugin/issues/519))

### `extractFiles`

| Option   | Type     | Default                |
| -------- | -------- | ---------------------- |
| filename | `String` | `'[hash][ext][query]'` |

`extractFiles()` resolves multimedia files (images, fonts, pdf) imported from other files, and copy/paste them into the output directory.

### `hotModuleReload`

`hotModuleReload()` enables [hot module replacement](https://webpack.js.org/plugins/hot-module-replacement-plugin/).

**Note:** it iss automatically enabled with `serve()`.

### `loadJs`

| Option  | Type        | Default     |
| ------- | ----------- | ----------- |
| include | `Condition` | `undefined` |
| exclude | `Condition` | `undefined` |

`loadJs()` resolves JavaScript files defined as entry points or imported in other JavaScript files, transpiles their syntax with `babel`, extracts the Webpack runtime into a separate `runtime.js` file, and gather common modules into a single `common.js` file.

### `serve`

| Option | Type      | Default         |
| ------ | --------- | --------------- |
| domain | `String`  | `'localhost'`   |
| port   | `Number`  | `8080`          |
| watch  | `Object`  | [watch](#watch) |

`serve()` runs an HTTP server serving the bundled application loaded in `src/index.html` with hot module replacement enabled.

### `serverRender`

| Option   | Type     | Default        |
| -------- | -------- | -------------- |
| filename | `String` | `'render.js'`  |
| mode     | `String` | `'production'` |
| path     | `String` | `'/'`          |

`serverRender()` bundles a JavaScript entry into a single file with the imported CSS excluded from it.

This entry should be located in a `server` directory at the root of your project. It's mostly meant to render the HTML of a JavaScript application on the server, before executing (hydrating) it client side.

### `watch`

| Option           | Type        | Default          |
| ---------------- | ----------- | ---------------- |
| poll             | `Boolean`   | `100`            |
| aggregateTimeout | `Number`    | `200`            |
| ignored          | `Condition` | `/node_modules/` |

`watch()` enables files watching and automatic recompilation on change.
