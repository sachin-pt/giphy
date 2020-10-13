const browserList = require('./config/browserlist')
const baseConfig = {
  compact: true,
  presets: ['@babel/preset-react', ['@emotion/babel-preset-css-prop', { sourceMap: false }]],
  plugins: [
    '@loadable/babel-plugin',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
const getPresentEnv = (type = 'l', targets = { browsers: browserList(type) }) => ({
  ...baseConfig,
  presets: [
    [
      '@babel/preset-env',
      {
        modules: type === 'test' ? 'auto' : false,
        targets,
        corejs: 3,
        useBuiltIns: 'usage'
      }
    ],
    ...baseConfig.presets
  ]
})
module.exports = {
  env: {
    server: getPresentEnv(null, {
      node: 'current'
    }),
    'client-l': getPresentEnv('l'),
    'client-a': getPresentEnv('a'),
    'client-m': getPresentEnv('m'),
    test: getPresentEnv('test')
  }
}
