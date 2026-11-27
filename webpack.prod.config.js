const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const pages = require('./webpack.pages');

module.exports = {
  mode: 'production',

  entry: Object.fromEntries(pages.map(p => [p.chunk, `./src/${p.script}`])),

  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
    ...pages.map(p => new HtmlWebpackPlugin({
      template: `./src/${p.template}`,
      inject: true,
      chunks: ['shared', p.chunk],
      filename: p.template,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        minifyCSS: true,
        minifyJS: true,
      },
    })),
  ],

  optimization: {
    // '...' keeps webpack's default JS minimizer.
    minimizer: ['...', new CssMinimizerPlugin()],
    splitChunks: {
      cacheGroups: {
        // normalize.css and main.css are imported by every page. Emit them once.
        sharedStyles: {
          name: 'shared',
          test: /[\\/]src[\\/](normalize|main)\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
