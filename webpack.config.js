const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  resolve: { extensions: ['.jsx', '.js', '.json'] },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html',
    }),
    new CopyPlugin([
      { from: '_redirects' },
    ]),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
