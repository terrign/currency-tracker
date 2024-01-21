module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort', 'import', 'react', 'react-hooks'],
  extends: [
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'no-console': 'error',
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'react': {
      version: 'detect',
    },
    'import/resolver': {
      alias: {
        map: [
          ['components', './src/components'],
          ['assets', './src/assets'],
          ['context', './src/context'],
          ['hooks', './src/hooks'],
          ['pages', './src/pages'],
          ['services', './src/services'],
          ['router', './src/router'],
          ['types', './src/types/index'],
          ['utils', './src/utils/index'],
          ['@constants', './src/constants/index'],
          ['mocks', './__test__/__mocks__'],
        ],
        extensions: ['.tsx', '.ts'],
      },
    },
  },
  ignorePatterns: ['/*.css', '*.eslintrc.js', '*.config.js', '*.config.ts', '/__test__/*', '/cypress/*'],
};
