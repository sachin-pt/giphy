const paths = require('../paths')
const routeMap = {
  development: paths.routes,
  production: paths.routes,
}
module.exports = {
  extensions: ['.js', '.mjs', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
  alias: {
    client: paths.srcClient,
    server: paths.srcServer,
    shared: paths.srcShared,
    src: paths.src,
    build: paths.build,
    config: paths.config,
    activeRoutes: routeMap[process.env.ROUTE_TYPE || process.env.NODE_ENV]
  }
}
