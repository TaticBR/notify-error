module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb-base',
    'plugin:prettier/recommended',
    'prettier',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier',
    'eslint-plugin-import-helpers',
  ],
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-explicit-any': 'on',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'class-methods-use-this': 'off',
    'no-useless-constructor': 'off',
    'import/prefer-default-export': 'off',
    'no-empty-function': ['error', { allow: ['constructors'] }],
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: ['/^@nest/', 'module', '/^~/', ['parent', 'sibling', 'index']],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
  overrides: [
    {
      files: ['src/migrations/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: {
        extensions: ['.ts'],
      },
    },
  },
};
