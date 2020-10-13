const path = require('path')
const paths = require('../paths')
const resolvers = require('./resolvers')

const reactAlias =
  process.env.USE_REACT !== 'false'
    ? {}
    : {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }

module.exports = {
  target: 'web',
  entry: {
    bundle: [`${paths.srcClient}/index.js`],
    // need these two entries because these three files are only imported on server and hence not formed in client build. but we need them in client build as well so that static assets made by them can be moved to s3
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'bundle.js',
    publicPath: paths.publicPath
  },
  resolve: {
    ...resolvers,
    alias: {
      ...resolvers.alias,
      'conf/appConfig': paths.clientConfig,
      'node-fetch': paths.clientFetch,
      ...reactAlias
    }
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    moduleIds: 'hashed',
    noEmitOnErrors: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: false,
      maxInitialRequests: Infinity,
      minSize: 30000,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `_${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false
  }
}
