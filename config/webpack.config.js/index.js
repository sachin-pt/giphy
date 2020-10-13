const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const prodClient = require('./client.prod')
const clientBuild = require('./client.dev')
const buildType = process.env.BUILD_TYPE || 'm'
module.exports =
  process.env.NODE_ENV === 'production'
    ? [
      new SpeedMeasurePlugin().wrap(prodClient('m')),
      new SpeedMeasurePlugin().wrap(prodClient('l')),
      new SpeedMeasurePlugin().wrap(prodClient('a')),
      new SpeedMeasurePlugin().wrap(require('./server.prod')())
    ]
    : [new SpeedMeasurePlugin().wrap(clientBuild(buildType)), require('./server.dev')(buildType)]
