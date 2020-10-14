const rimraf = require('rimraf')
const paths = require('../config/paths')
const { logMessage } = require('./utils')
const run = require('parallel-webpack').run
const build = async () => {
  rimraf.sync(paths.clientBuild)
  rimraf.sync(paths.serverBuild)

  try {
    let startTime = new Date()
    await run(
      require.resolve('../config/webpack.config.js'),
      {
        watch: false,
        maxRetries: 1,
        maxConcurrentWorkers: 4 // use 4 workers
      },
      (data) => {
        if (!data) return
        const { message, stats = {} } = data
        console.log('Build Message', message)
        const { errors, warnings } = JSON.parse(stats)
        console.log('Build Errors', ...errors)
        console.log('Build Warnings', ...warnings)
      }
    )
    console.log('Build completed in:', new Date() - startTime)
    logMessage('Done!', 'info')
    process.exit()
  } catch (error) {
    logMessage(error, 'error')
    process.exit(1)
  }
}

build()
