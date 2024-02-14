const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  watch: true,
  target: 'web',
  entry: {
    index: path.resolve(__dirname, "src", "index.js"),
    about: path.resolve(__dirname, "src", "about.js"),
    eatingDisorders: path.resolve(__dirname, "src", "eating-disorders.js"),
    consultations: path.resolve(__dirname, "src", "consultations.js"),
    qualifications: path.resolve(__dirname, "src", "qualifications.js"),
    contact: path.resolve(__dirname, "src", "contact.js"),
    nutritionalTherapy: path.resolve(__dirname, "src", "nutritional-therapy.js")
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dev"),
  },

  devServer: {
    static: path.resolve(__dirname, 'dev'),
    watchFiles: {
      paths: ['src/**/*.*'], // <= watching files
      options: {
        usePolling: true,
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/about.html',
      inject: true,
      chunks: ['about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/eating-disorders.html',
      inject: true,
      chunks: ['eatingDisorders'],
      filename: 'eating-disorders.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/consultations.html',
      inject: true,
      chunks: ['consultations'],
      filename: 'consultations.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/qualifications.html',
      inject: true,
      chunks: ['qualifications'],
      filename: 'qualifications.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/contact.html',
      inject: true,
      chunks: ['contact'],
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      template: 'src/nutritional-therapy.html',
      inject: true,
      chunks: ['nutritionalTherapy'],
      filename: 'nutritional-therapy.html'
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