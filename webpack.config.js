var path = require('path')

var webpackConfig = {
  entry: {
    hello_world: './src/examples/hello_world/hello_world.js',
    sankey: './src/examples/sankey/sankey.ts',
    subtotal: './src/examples/subtotal/subtotal.tsx'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    library: '[name]',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    loaders: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  }
}

module.exports = webpackConfig
