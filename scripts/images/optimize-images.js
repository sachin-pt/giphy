// Usage: pass path to file name to optimize
const conf = require('../../config/appConfig')
const tinify = require('tinify')
const [, , file] = process.argv
tinify.key = conf.tinyPngApiKey
tinify.fromFile(file).toFile(file, function (err) {
  if (err) {
    return process.exit(1)
  }
  process.exit(0)
})
