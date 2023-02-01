const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = (env) => ({
  entry: `${APP_PATH}/index.tsx`,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_PATH,
    },
    historyApiFallback: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html'),
    }),
    new webpack.DefinePlugin({
      TARGET_ENV: JSON.stringify(env.TARGET),
    }),
  ],
  resolve: {
    alias: {
      '@': APP_PATH,
      '@ui': `${APP_PATH}/components/ui`,
    },
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
});
