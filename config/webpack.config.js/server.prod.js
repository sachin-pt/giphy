const config = require('./server.base')
const paths = require('../paths')
module.exports = () => ({
  ...config,
  output: { ...config.output, publicPath: paths.prodPublicPath },
  mode: 'production'
})
