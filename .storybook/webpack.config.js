const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js')
const path = require('path')

module.exports = (baseConfig, env) => {
  baseConfig.devtool = 'sourcemap'
  const config = genDefaultConfig(baseConfig)

  // add our custom loaders - or anything else that's needed
  config.module.rules.unshift({
    test: /\.png$/,
    include: path.resolve(__dirname, '../'),
    loader: require.resolve('ignore-loader')
  })

  config.resolve.alias['@components'] = path.resolve(__dirname, '../src/components')

  return config
}
