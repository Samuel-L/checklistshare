const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const HtmlWebPackPluginConfig = new HtmlWebPackPlugin({
  template: './client/src/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', './client/src/index.jsx'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, './client/src'),
    filename: 'index_bundle.js',
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
  plugins: [HtmlWebPackPluginConfig]
};
