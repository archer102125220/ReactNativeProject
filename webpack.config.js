const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({path: path.join(__dirname, '/.env')});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build/web'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.tsx', '.ts', '.jsx', '.json'],
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              // modifyVars: theme,
              // javascriptEnabled: true,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [{loader: 'ts-loader'}],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg)$/,
        include: path.join(__dirname, 'web/public/assets'),
        loader: 'file-loader',
      },
      // {
      //   enforce: 'pre',
      //   test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      // },
      {test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
      {
        test: /\.(jpe?g|png|gif|svg|png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 100000},
          },
          'image-webpack-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'web', 'index.html'),
      favicon: path.join(__dirname, 'web', 'public', 'favicon.ico'),
    }),
    new Dotenv({
      // path: './.env', // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
  ],
  devServer: {
    port: dotenv.parsed.APP_PORT || 8080,
    host: dotenv.parsed.APP_HOST || 'localhost',
    hot: true,
  },
};
