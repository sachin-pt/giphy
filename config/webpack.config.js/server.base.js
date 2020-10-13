const path = require('path')
const nodeExternals = require('webpack-node-externals')

const paths = require('../paths')
const loaders = require('./loaders')
const resolvers = require('./resolvers')
const plugins = require('./plugins')

const reactAlias =
  process.env.USE_REACT !== 'false'
    ? {}
    : {
      // wont actually be useful since we are using nodeExternals - so none of the node modules is actually aliased, but will help with in browser linting, since linters usually read the webpack config to identify what all is installed
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    server: [path.resolve(paths.srcServer, 'index.js')],
  },
  externals: [
    nodeExternals({
      // we still want imported css from external files to be bundled otherwise 3rd party packages
      // which require us to include their own css would not work properly
      whitelist: /\.css$/
    })
  ],
  output: {
    path: paths.serverBuild,
    filename: '[name].js',
    publicPath: paths.publicPath
    // libraryTarget: 'commonjs2',
  },
  resolve: {
    ...resolvers,
    alias: {
      ...resolvers.alias,
      'conf/appConfig': paths.serverConfig,
      ...reactAlias
    }
  },
  module: {
    rules: loaders(true)
  },
  plugins: plugins(true),
  devtool: 'source-map',
  stats: {
    colors: true
  }
}
