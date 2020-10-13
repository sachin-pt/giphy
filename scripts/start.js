const path = require('path')

const { logMessage, compilerPromise, getLocalIP } = require('./utils')
if (process.env.LOCAL_IP) {
  process.env.LOCAL_IP = getLocalIP()
}

const webpack = require('webpack')
const rimraf = require('rimraf')
const nodemon = require('nodemon')
const [clientConfig, serverConfig] = require('../config/webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express = require('express')
const paths = require('../config/paths')
const app = express()
const WEBPACK_PORT = paths.WEBPACK_PORT
const start = async () => {
  rimraf.sync(paths.clientBuild)
  rimraf.sync(paths.serverBuild)

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle
  ]

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

  const publicPath = clientConfig.output.publicPath

  clientConfig.output.publicPath = [
    `http://${process.env.LOCAL_IP || 'localhost'}:${WEBPACK_PORT}`,
    publicPath
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')

  serverConfig.output.publicPath = [
    `http://${process.env.LOCAL_IP || 'localhost'}:${WEBPACK_PORT}`,
    publicPath
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/')

  const multiCompiler = webpack([clientConfig, serverConfig])

  const clientCompiler = multiCompiler.compilers.find(
    (compiler) => compiler.name === process.env.BUILD_TYPE || 'm'
  )
  const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server')

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)

  const watchOptions = {
    // poll: true,
    ignored: /node_modules/,
    stats: clientConfig.stats
  }

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })

  // this serves static files + recompiles client files on new changes
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: clientConfig.output.publicPath,
      stats: clientConfig.stats,
      watchOptions
    })
  )
  // it syncs the new files generated by devMiddleware to client without manual reload
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))

  app.listen(WEBPACK_PORT)
  // this recompiles server files on new changes
  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && stats && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats))
      return
    }

    if (error) {
      logMessage(error, 'error')
    }

    if (stats.hasErrors()) {
      const info = stats.toJson()
      const errors = info.errors[0].split('\n')
      logMessage(errors[0], 'error')
      logMessage(errors[1], 'error')
      logMessage(errors[2], 'error')
    }
  })

  // wait until client and server is compiled
  try {
    await clientPromise
    await serverPromise
  } catch (error) {
    logMessage(error, 'error')
  }

  /*
  * {
    script: `--inspect ${paths.serverBuild}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client']
  }
  * */
  // nodemon is required to restart the server when webpack's serverCompiler.watch recompiles server files - nodemon is only looking at the server build folder not the source folder
  // if we directly start the server with node build/server/server.js then the files would recompile on changes but since node server has already started it will still serve old files - maybe we can find some warmRequire solution later
  // also somehow there is some problem with require('shelljs').exec('node build/server/server.js') -> somehow when using this webpack watch stops working -> although note that shelljs is not meant for watching file changes, so it's irrelevant anyway
  const script = nodemon(
    `--delay 100ms --ignore "src scripts config ./*.* build/client"${
      process.env.DEBUG_MODE ? ' --inspect' : ''
    } ${paths.serverBuild}/server.js`
  )

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    console.log('Process ended')
    process.exit()
  })

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error')
    process.exit(1)
  })
}

start()