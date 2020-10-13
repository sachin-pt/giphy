const webpack = require('webpack')
const LoadablePlugin = require('@loadable/webpack-plugin')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const BrotliGzipPlugin = require('brotli-gzip-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')
const paths = require('../paths')
const branch = require('../vars').branch
const reportPath = (type) =>
  path.join(paths.workspace, `reports/${branch}/analyzer/report-${type}.html`)

const shared = []
const bannerOptions = {
  raw: true,
  banner: 'require("source-map-support").install();'
}

const clientPlugins = (type) => {
  let plugins = [
    new webpack.DefinePlugin({
      __SERVER__: 'false',
      __USE_REACT__: JSON.stringify(process.env.USE_REACT !== 'false'),
      __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
      __BUILD_TYPE__: JSON.stringify(process.env.BUILD_TYPE || 'm'),
      __BUILD_ENV__: JSON.stringify(process.env.BUILD_ENV || 'beta')
    }),
    new LoadablePlugin({ filename: `${type}-stats.json` })
  ]
  return plugins
}

const server = [
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __PROD__: JSON.stringify(process.env.NODE_ENV === 'production'),
    __USE_REACT__: JSON.stringify(process.env.USE_REACT !== 'false'),
    __BUILD_TYPE__: JSON.stringify(process.env.BUILD_TYPE || 'm'),
    __BUILD_ENV__: JSON.stringify(process.env.BUILD_ENV || 'beta')
  }),
  new webpack.BannerPlugin(bannerOptions),
]

const commonClientProdPlugins = (type) => [
  new BrotliGzipPlugin({
    asset: '[path].br[query]',
    algorithm: 'brotli',
    test: new RegExp(`.(${type}.js|(css|html|svg|ttf|woff|json))$`),
    threshold: 1024,
    minRatio: 0.9
  }),
  ...(type === 'm'
    ? [
      new UnusedFilesWebpackPlugin({
        failOnUnused: true,
        globOptions: {
          ignore: [
            'build/**/*',
            'node_modules/**/*',
            'code@tmp/**/*',
            'config/**/*',
            'reports/**/*',
            'src/server/**/*',
            'src/shared/jsconfig.json',
            'scripts/**/*',
            '*'
          ]
        }
      }),
      new ImageminWebpWebpackPlugin({
        config: [
          {
            test: /\.(jpe?g|png)/,
            options: {
              quality: 82
            }
          }
        ],
        overrideExtension: false,
        strict: false
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        defaultSizes: 'gzip',
        reportFilename: reportPath(type)
      })
    ]
    : [
      new BrotliGzipPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`.(${type}.js|(css|html|svg|ttf|woff|json))$`),
        threshold: 1024,
        minRatio: 0.9
      })
    ])
]

const clientDevPlugins = (type = 'l') => [
  new WriteFileWebpackPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  ...shared,
  ...clientPlugins(type)
]

const serverDevPlugins = [new WriteFileWebpackPlugin(), ...shared, ...server]

const serverProdPlugins = [...shared, ...server]

const clientProdPlugins = (type = 'l') => [
  ...shared,
  ...clientPlugins(type),
  ...commonClientProdPlugins(type)
]

const getClientPlugins = (type) => {
  const map = {
    production: clientProdPlugins,
    development: clientDevPlugins
  }
  return map[process.env.NODE_ENV](type)
}

const getServerPlugins = () => {
  const map = {
    production: serverProdPlugins,
    development: serverDevPlugins
  }
  return map[process.env.NODE_ENV]
}

module.exports = (isServer, type) => (isServer ? getServerPlugins() : getClientPlugins(type))
