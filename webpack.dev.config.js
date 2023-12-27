const EslintPlugin = require('eslint-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    port: 8080,
    compress: true,
    allowedHosts: 'all',
    hot: true,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
        runtimeErrors: true,
      },
      progress: true,
    },
  },
  plugins: [new EslintPlugin({ extensions: ['tsx', 'ts'] })],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
};
