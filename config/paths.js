const path = require('path')
const fs = require('fs')
const config = require('./appConfig')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)
const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501)
const paths = {
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  build: resolveApp('build'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  resolveApp,
  workspace: process.env.WORKSPACE ? path.resolve(process.env.WORKSPACE) : resolveApp(''),
  app: process.env.WORKING_DIR ? path.resolve(process.env.WORKING_DIR) : resolveApp(''),
  srcClient: resolveApp('src/client'),
  config: resolveApp('config'),
  srcServer: resolveApp('src/server'),
  srcShared: resolveApp('src/shared'),
  routes: resolveApp('src/shared/routes/routes'),
  WEBPACK_PORT,
  clientFetch: resolveApp('src/client/lib/clientFetch'),
  serverLogger: resolveApp('src/server/middlewares/logger/index.js'),
  clientConfig: resolveApp('src/client/appConfig.json'),
  serverConfig: resolveApp('src/server/appConfig.json'),
  loadableClientStatsFile: (type = 'l') => resolveApp(`build/client/s/${type}-stats.json`),
  loadableServerStatsFile: resolveApp('build/server/loadable-stats.json'),
  publicPath: '/s/',
  prodPublicPath: process.env.LOCAL_IP
    ? `http://${process.env.LOCAL_IP}:8501/s/`
    : (config.server.cdnEndpoint
      ? [config.server.cdnEndpoint || '', '/s/'].join('/')
      : '/s/'
    ).replace(/([^:+])\/+/g, '$1/'),
}

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.srcShared,
  paths.src,
  'node_modules'
]

module.exports = paths
