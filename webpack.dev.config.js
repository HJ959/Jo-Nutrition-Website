const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    eatingDisorders: "./src/eating-disorders.js",
    consultations: "./src/consultations.js",
    qualifications: "./src/qualifications.js",
    contact: "./src/contact.js"
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dev"),
  },

  devServer: {
    static: './dev',
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      inject: true,
      chunks: ['about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/eating-disorders.html',
      inject: true,
      chunks: ['eatingDisorders'],
      filename: 'eating-disorders.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/consultations.html',
      inject: true,
      chunks: ['consultations'],
      filename: 'consultations.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/qualifications.html',
      inject: true,
      chunks: ['qualifications'],
      filename: 'qualifications.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      inject: true,
      chunks: ['contact'],
      filename: 'contact.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};