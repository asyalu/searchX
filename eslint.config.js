import { defineConfig } from 'eslint-define-config'
import ts from '@typescript-eslint/eslint-plugin'
import react from 'eslint-plugin-react'
import parser from '@typescript-eslint/parser'

export default defineConfig([
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      '@typescript-eslint': ts,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': [
        'off',
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
          packageDir: './',
        },
      ],
      'indent': [
        'error',
        2,
        {
          'SwitchCase': 1,
          'VariableDeclarator': 1,
          'outerIIFEBody': 1,
        },
      ],
      'no-trailing-spaces': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'react/jsx-uses-vars': 'warn',
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-console': 'warn',
      'eol-last': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
])
