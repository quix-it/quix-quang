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
      'pnpm-lock.yaml',
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
      '@typescript-eslint/no-explicit-any': 'error',
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
      // Signal APIs and modern Angular. At error only the rules with no backlog: lint-staged and the
      // Claude hook fail on any error in a touched file. ViewChild is still in modal.component.ts;
      // readonly signal properties would change the public API (consumers reassign them): next major.
      '@angular-eslint/prefer-signals': ['error', { preferQuerySignals: false, preferReadonlySignalProperties: false }],
      '@angular-eslint/prefer-output-emitter-ref': 'error',
      '@angular-eslint/prefer-signal-model': 'error',
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/no-implicit-take-until-destroyed': 'error',
      // Backlog in shipped components or playground examples: warn until fixed, then raise to error.
      '@angular-eslint/prefer-host-metadata-property': 'warn',
      '@angular-eslint/component-max-inline-declarations': ['warn', { template: 0, styles: 0, animations: 0 }],
      'no-restricted-imports': [
        'warn',
        {
          paths: [
            { name: '@angular/common', importNames: ['CommonModule'], message: 'Import only what the template uses.' },
            { name: '@angular/forms', importNames: ['FormsModule'], message: 'Reactive or signal forms, no ngModel.' },
          ],
        },
      ],
    },
  },
  {
    // Test hosts declare their template inline.
    files: ['**/*.spec.ts'],
    rules: { '@angular-eslint/component-max-inline-declarations': 'off' },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-class-binding': 'warn',
      '@angular-eslint/template/prefer-style-binding': 'warn',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
    },
  }
)
