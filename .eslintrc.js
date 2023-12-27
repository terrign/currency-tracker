module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'simple-import-sort'],
  extends: ['airbnb', 'airbnb/hooks', 'airbnb-typescript', 'prettier', 'plugin:@typescript-eslint/recommended'],
  rules: {
    'react/function-component-definition': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/no-extraneous-dependencies': 'off',
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  ignorePatterns: ['/*.css', '*.eslintrc.js', '*.config.js'],
};
