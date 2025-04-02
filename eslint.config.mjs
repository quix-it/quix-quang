// @ts-check
import eslint from '@eslint/js'
import angular from 'angular-eslint'
import love from 'eslint-config-love'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '.angular',
      '.gradle',
      '.scannerwork',
      '.vscode',
      'android',
      'apple_certificates',
      'auth-page',
      'dist',
      'e2e',
      'firebase',
      'guardsquare',
      'ios',
      'keystore',
      'node_modules',
      'resources',
      'typings',
      'plugins',
      'src/app/apiModule',
      'typings',
      'www',
      'commitlint.config.js',
      'karma.conf.js',
      'package-lock.json',
      'package.json',
    ],
  },
  {
    ...love,
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    rules: {
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@angular-eslint/no-input-rename': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  }
)
