module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'indent': ['error', 4],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error'], 
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'max-len': ['error', { 'code': 180 }],
  },
}
