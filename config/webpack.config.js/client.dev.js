const baseConfig = require('./client.base')
const generateSourceMap = process.env.OMIT_SOURCEMAP !== 'true'
const plugins = require('./plugins')
const loaders = require('./loaders')
module.exports = (type = 'l') => {
  const config = {
    ...baseConfig,
    name: `client-${type}`,
    plugins: plugins(false, type),
    mode: 'development',
    module: {
      rules: loaders(false, type)
    },
    devtool: generateSourceMap ? 'source-map' : false,
    performance: {
      hints: false
    }
  }
  return config
}
