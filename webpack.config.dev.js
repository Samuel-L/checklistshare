const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './client/src/index.jsx'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './client/src'),
    filename: 'index_bundle.js',
  },
  devServer: {
    contentBase: './client/src',
  },
  module: {
    rules: [
      { test: [/\.js$/, /\.jsx$/], loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader" },
      { test: [/\.js?$/, /\.jsx$/], loader: 'eslint-loader', exclude: /node_modules/ },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
};
