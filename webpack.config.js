const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BASE_PATH = path.resolve(__dirname, '');
const APP_PATH = `${BASE_PATH}/src`;
const DIST_PATH = `${BASE_PATH}/build`;

module.exports = {
  entry: `${APP_PATH}/index.tsx`,
  output: {
    path: DIST_PATH,
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: DIST_PATH,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(APP_PATH, 'index.html'),
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
};
