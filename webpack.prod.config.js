const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  entry: {
    index: "./src/index.js",
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
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
      chunks: ['index'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/eating-disorders.html',
      inject: true,
      chunks: ['index'],
      filename: 'eating-disorders.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/consultations.html',
      inject: true,
      chunks: ['index'],
      filename: 'consultations.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/qualifications.html',
      inject: true,
      chunks: ['index'],
      filename: 'qualifications.html'
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      inject: true,
      chunks: ['index'],
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
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
            filename: './[name][ext]',
        },
    },
    ],
  },
};