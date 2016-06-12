const path = require('path');
const webpack = require('webpack');

const outputPath = path.resolve(__dirname, 'build', 'js');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
];

module.exports = {
  entry: {
    app: ['./src/entry.js'],
    vendor: [
      'react',
      'react-dom',
      'babel-polyfill',
    ],
  },
  output: {
    path: outputPath,
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.jsx?$/, exclude: '/node_modules/', loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
      {
        test: /\.css$/, loader: 'style!css',
      },
    ],
  },
};
