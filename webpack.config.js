var path = require('path');
var webpack = require('webpack');

var production = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});


module.exports = {
  entry: path.resolve(__dirname + '/src/app/index.js'),
  output: {
    path: 'assets',
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react', 'stage-2'] }
      },
      { test: /\.css$/i, loader: 'style-loader!css-loader' },
    ],
  },
  plugins: [
    // production,
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
