const path = require('path');
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
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: '[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentHashSalt: 'my-custom-hash',
                namedExport: true,
                exportOnlyLocals: false,
              },
            },
          },
        ],
      },
    ],
  },
};
