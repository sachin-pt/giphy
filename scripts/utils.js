const chalk = require('chalk')
const mkdirSync = require('mkdirp').sync
const fs = require('fs')
const path = require('path')
const os = require('os')

const getLocalIP = () => {
  const ifaces = os.networkInterfaces()
  let localIp
  Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0

    ifaces[ifname].forEach(function (iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return
      }
      if (alias === 0) {
        localIp = iface.address
      }
      ++alias
    })
  })
  return localIp
}

const logMessage = (message, level = 'info') => {
  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white'
  console.log(`[${new Date().toISOString()}]`, chalk[color](message))
}

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `)
    })
    compiler.hooks.done.tap(name, (stats) => {
      if (!stats.hasErrors()) {
        return resolve()
      }
      return reject(`Failed to compile ${name}`)
    })
  })
}
const writeFile = (dir, fileName, content) => {
  if (!fs.existsSync(dir)) {
    mkdirSync(dir)
  }
  fs.writeFileSync(path.join(dir, fileName), content)
}

module.exports = {
  logMessage,
  compilerPromise,
  writeFile,
  getLocalIP
}
