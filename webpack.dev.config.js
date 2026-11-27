const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./webpack.pages');

module.exports = {
  entry: Object.fromEntries(pages.map(p => [p.chunk, `./src/${p.script}`])),
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
    // Nav links are extensionless (/about). Pages live in memory as about.html.
    historyApiFallback: {
      rewrites: pages
        .filter(p => p.template !== 'index.html')
        .map(p => ({
          from: new RegExp(`^/${p.template.replace('.html', '')}$`),
          to: `/${p.template}`,
        })),
    },
  },
  
  watchOptions: {
    poll: 1000, // Check for changes every second
    ignored: /node_modules/,
  },  

  plugins: pages.map(p => new HtmlWebpackPlugin({
    template: `src/${p.template}`,
    inject: true,
    chunks: [p.chunk],
    filename: p.template,
  })),
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
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
};