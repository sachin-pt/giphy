const env = require('./vars').env
let userConfig = {}
try {
  userConfig = require('./application.json')
} catch (e) {
  console.log(`Error: application json not found, will proceed ? -> ${env !== 'production'}`)
  if (env === 'production') {
    throw e
  }
}

// The foll. is done to remove the need of emailing everyone
// that a new required key has been added.
let sampleConfig = {}
if (env !== 'production') {
  sampleConfig = require('./application.sample.json')
}
const appConfig = Object.assign({}, sampleConfig, userConfig)
module.exports = appConfig
