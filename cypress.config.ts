import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import path from 'path';
import Dotenv from 'dotenv-webpack';

export default defineConfig({
  e2e: {
    supportFile: path.resolve(__dirname, 'cypress/support/e2e.ts'),
    baseUrl: 'http://localhost:8080/',
    setupNodeEvents(on, config) {
      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: {
            module: {
              rules: [
                {
                  test: /\.(jsx|js|ts|tsx)?$/,
                  exclude: /node_modules/,
                  loader: 'babel-loader',
                },
              ],
            },
            resolve: {
              extensions: ['.tsx', '.ts', '.jsx', '.js'],
              alias: {
                'components': path.resolve(__dirname, 'src/components/'),
                'assets': path.resolve(__dirname, 'src/assets/'),
                'context': path.resolve(__dirname, 'src/context/'),
                'hooks': path.resolve(__dirname, 'src/hooks/'),
                'pages': path.resolve(__dirname, 'src/pages/'),
                'router': path.resolve(__dirname, 'src/router/'),
                'services': path.resolve(__dirname, 'src/services/'),
                'types': path.resolve(__dirname, 'src/types/index'),
                'utils': path.resolve(__dirname, 'src/utils/index'),
                '@constants': path.resolve(__dirname, 'src/constants/index'),
              },
            },
            plugins: [
              new Dotenv({
                path: path.resolve(__dirname, '.env'),
              }),
            ],
          },
        }),
      );
    },
  },
});
