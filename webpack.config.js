const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = {
  entry: './src/index.tsx',
  target: 'web',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: path.resolve(path.resolve(__dirname, './src/assets/logo.svg')),
      prefix: '/favicons/',
      outputPath: path.resolve(path.resolve(__dirname, './dist'), 'favicons'),
      mode: 'webapp',
      inject: (htmlPlugin) => path.basename(htmlPlugin.options.filename) === 'index.html',
      favicons: {
        icons: {
          appleIcon: true, // Apple touch icons.
          appleStartup: false, // Apple startup images.
          android: true, // Android homescreen icon.
          favicons: true, // Regular favicons.
          coast: false, // Opera Coast icon.
          firefox: false, // Firefox OS icons.
          windows: false, // Windows 8 tile icons.
          yandex: false, // Yandex browser icon.
        },
      },
      cache: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
};

module.exports = (env, args) => {
  console.log(process.env.NODE_ENV);
  switch (args.mode) {
    case 'development':
      return merge(common, require('./webpack.dev.config'));
    case 'production':
      return merge(common, require('./webpack.prod.config'));
    default:
      throw new Error('No matching configuration was found!');
  }
};
