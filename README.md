
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
  {
    mode: 'development',
    plugins: [new HtmlWebpackPlugin()],
  },
  parts.extractFiles(),
  parts.extractCss(),
  parts.loadJs(),
  parts.serverDev())
```

## Installation

```shell
  npm i @cdoublev/webpack-parts
```

`@cdoublev/webpack-parts` can be safely used with Webpack v5 in current NodeJS versions.

Some parts depends on (and are documented with) Webpack loaders and plugins that are not automatically installed.

## Configuration

### `externalize`

| Option | Type       | Default |
| ------ | ---------- | ------- |
| keep   | `[String]` | `[]`    |

`externalize()` excludes all `node_modules` from the bundle, which is recommended for server side script, and `keep` the required module names bundled.

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

Depends on [`css-loader >= 5`](https://github.com/webpack-contrib/css-loader), [`postcss-loader >= 4`](https://github.com/webpack-contrib/postcss-loader), and [`mini-css-extract-plugin >= 1`](https://github.com/webpack-contrib/https://github.com/webpack-contrib/mini-css-extract-plugin).

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

**Note:** it's automatically enabled with `serverDev()`.

### `loadJs`

| Option  | Type        | Default          |
| ------- | ----------- | ---------------- |
| include | `Condition` | `undefined`      |
| exclude | `Condition` | `/node_modules/` |

`loadJs()` resolves JavaScript files defined as entry points or imported in other JavaScript files, transpiles their syntax with `babel`, extracts the Webpack runtime into a separate `runtime.js` file, and gather common modules into a single `common.js` file.

Depends on [`babel-loader >= 8`](https://github.com/babel/babel-loader).

### `loadJsDependencies`

`loadJsDependencies()` resolves JavaScript files imported from `./node_modules/` in the project source files and transpiles their syntax with `babel`.

Note: transpiling `node_modules` (dependencies) means a longer compilation time but it is required to transpile dependencies using targets defined by the project (in its `browserslist` configuration) instead of the targets defined by the dependency package author.

Note: `@babel/plugin-transform-runtime` is required to re-use helpers injected by `babel` from `@babel/runtime`.

Depends on [`babel-loader >= 8`](https://github.com/babel/babel-loader), [`@babel/preset-env >= 7`](https://github.com/babel/babel/tree/master/packages/babel-preset-env), [`@babel/runtime >= 7`](https://github.com/babel/babel/tree/master/packages/babel-runtime), and [`@babel/plugin-transform-runtime >= 7`](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-runtime).

### `serverDev`

| Option | Type      | Default         |
| ------ | --------- | --------------- |
| https  | `Boolean` | `false`         |
| domain | `String`  | `'localhost'`   |
| port   | `Number`  | `8080`          |
| path   | `String`  | `'/'`           |
| proxy  | `String`  | `undefined`     |
| watch  | `Object`  | [watch](#watch) |

`serverDev()` runs an HTTP server to request your bundled files, by default via `http://localhost:8080`, with hot module replacement enabled.

Depends on [`webpack-dev-server >= 3`](https://github.com/webpack/webpack-dev-server/).

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
