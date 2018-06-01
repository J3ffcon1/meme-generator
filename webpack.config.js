/* eslint-env node */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  performance : {
    hints: false
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(`${path}/bundle.*.js`),
    new HtmlWebpackPlugin({
      title: 'meme-generator',
      filename: './dist/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/, //run babel from this file, change all other types to javaScript
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'dirname/[hash].[ext]'
          }
        } 
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
  
    ]

  }
};
