const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', './client/src/index.jsx'],
  devtool: 'source-map',
  target: 'web',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    publicPath: '/',
    filename: 'index_bundle.js',
  },
  devServer: {
    contentBase: './client/dist',
  },
  module: {
    rules: [
      { test: [/\.js$/, /\.jsx$/], loader: 'babel-loader', exclude: /node_modules/ },
      { test: /(\.css)$/, use: [ MiniCssExtractPlugin, 'css-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader" },
      { test: [/\.js?$/, /\.jsx$/], loader: 'eslint-loader', exclude: /node_modules/ },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
};
