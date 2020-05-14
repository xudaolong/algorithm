module.exports = {
  env: {
    node: true,
    browser: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/display-name': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/prop-types': 'off',
    'no-console': ['warn'],
    'no-undef': ['warn'],
    'no-console': 'off',
    'import/no-unresolved': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    'react/no-children-prop': ['warn'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error']
  },
  overrides: [
    {
      files: ['*.{test,spec,story,stories}.{tsx|jsx}'],
      rules: {
        'import/no-extraneous-dependencies': ['warn', { packageDir: './' }],
        'import/no-unresolved': 'off'
      }
    }
  ],
  globals: {
    __PACKAGES__: 'true',
    __DEV__: 'true',
    Promise: 'true'
  }
}
