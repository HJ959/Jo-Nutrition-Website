const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = [
  { name: 'index',            template: 'index.html',             chunk: 'index' },
  { name: 'about',            template: 'about.html',             chunk: 'about' },
  { name: 'eatingDisorders',  template: 'eating-disorders.html',  chunk: 'eatingDisorders' },
  { name: 'consultations',    template: 'consultations.html',     chunk: 'consultations' },
  { name: 'qualifications',   template: 'qualifications.html',    chunk: 'qualifications' },
  { name: 'contact',          template: 'contact.html',           chunk: 'contact' },
  { name: 'nutritionalTherapy', template: 'nutritional-therapy.html', chunk: 'nutritionalTherapy' },
  { name: 'podcast',          template: 'podcast.html',           chunk: 'podcast' },
];

module.exports = {
  mode: 'production',

  entry: Object.fromEntries(pages.map(p => [p.chunk, `./src/${p.chunk === 'eatingDisorders' ? 'eating-disorders' : p.chunk === 'nutritionalTherapy' ? 'nutritional-therapy' : p.chunk}.js`])),

  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash:8].css' }),
    ...pages.map(p => new HtmlWebpackPlugin({
      template: `./src/${p.template}`,
      inject: true,
      chunks: [p.chunk],
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
