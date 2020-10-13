const babelLoader = (envName) => ({
  test: /\.(js|jsx|mjs)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'thread-loader'
    },
    {
      loader: 'babel-loader',
      options: { envName }
    }
  ]
})

const urlLoader = (emitFile = false) => ({
  test: /(inline\/)(.)*\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve('url-loader'),
  options: {
    limit: 2048,
    name: 'assets/[name].[hash:8].[ext]',
    emitFile
  }
})

const fileLoader = (emitFile = false) => ({
  exclude: [/\.(js|mjs|html|json)$/],
  use: [
    {
      loader: require.resolve('file-loader'),
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        emitFile
      }
    }
  ]
})

const clientModern = [
  {
    oneOf: [babelLoader('client-m'), urlLoader(true), fileLoader(true)]
  }
]
const clientLegacy = [
  {
    oneOf: [babelLoader('client-l'), urlLoader(), fileLoader()]
  }
]

const clientAverage = [
  {
    oneOf: [babelLoader('client-a'), urlLoader(), fileLoader()]
  }
]
const server = [
  {
    oneOf: [babelLoader('server'), urlLoader(), fileLoader()]
  }
]

const clientLoadersMap = {
  m: clientModern,
  l: clientLegacy,
  a: clientAverage
}
const clientLoaders = (type = 'l') => clientLoadersMap[type]
module.exports = (isServer, type) => (isServer ? server : clientLoaders(type))
