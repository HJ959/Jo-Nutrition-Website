const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/index.js",
    about: "./src/about.js",
    eatingDisorders: "./src/eating-disorders.js",
    consultations: "./src/consultations.js",
    qualifications: "./src/qualifications.js",
    contact: "./src/contact.js",
    nutritionalTherapy: "./src/nutritional-therapy.js",
    podcast: "./src/podcast.js"
  },
  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "[name].bundle.js",
  },
  mode: 'development',
  target: 'web',

  devServer: {
    static: path.resolve(__dirname, 'dev'),
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    open: true,
    watchFiles: ['src/**/*.html'],
  },
  
  watchOptions: {
    poll: 1000, // Check for changes every second
    ignored: /node_modules/,
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
    }),
    new HtmlWebpackPlugin({
      template: 'src/podcast.html',
      inject: true,
      chunks: ['podcast'],
      filename: 'podcast.html'
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