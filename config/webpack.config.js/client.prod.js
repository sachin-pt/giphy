const baseConfig = require('./client.base')
const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true'
const TerserJsPlugin = require('terser-webpack-plugin')
const paths = require('../paths')
const plugins = require('./plugins')
const loaders = require('./loaders')
const getMinimizer = (type) =>
  new TerserJsPlugin({
    parallel: true,
    cache: true,
    terserOptions: {
      ...(type === 'm' ? { ecma: 8 } : {}),
      compress: {
        drop_console: true
      }
    }
  })
module.exports = (type = 'l') => {
  const config = {
    ...baseConfig,
    mode: 'production',
    name: `client-${type}`,
    optimization: {
      ...baseConfig.optimization,
      concatenateModules: true,
      minimizer: [getMinimizer(type)]
    },
    plugins: plugins(false, type),
    module: {
      rules: loaders(false, type)
    },
    devtool: generateSourceMap ? 'source-map' : false,
    performance: {
      ...baseConfig.performance,
      hints: false
    }
  }
  config.output = {
    ...config.output,
    filename: `bundle.[chunkhash:8].${type}.js`,
    chunkFilename: `[name].[chunkhash:8].${type}.js`,
    publicPath: paths.prodPublicPath
  }
  return config
}
