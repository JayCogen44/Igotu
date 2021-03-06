const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const entry = ['./client/index.js'];

const output = {
  path: path.resolve(__dirname, 'build'),
  filename: 'build.js',
  publicPath: '/',
};

module.exports = {
  entry,
  output,
  // optimization: { minimize: false },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(less|css)$/,
        exclude: /node_modules/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'less-loader' }]
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'url-loader'
          },
        ]
      }
    ]
  },
  devServer: {
    open: true,
    contentBase: path.resolve(__dirname, 'client'),
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://192.168.0.219:3000',
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  plugins: [new htmlWebpackPlugin({ template: './client/index.html' })]
};

