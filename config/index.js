const fs = require('fs')

const appConfig = require('./appConfig')

console.log('creating appConfig')
const { common, server, client } = appConfig
fs.writeFileSync('src/server/appConfig.json', `${JSON.stringify({ ...common, ...server })}`)
fs.writeFileSync('src/client/appConfig.json', `${JSON.stringify({ ...common, ...client })}`)
console.log('created appConfig')
