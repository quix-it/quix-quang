// @ts-check
import tseslint from 'typescript-eslint'

import rootConfig from '../../eslint.config.mjs'

export default tseslint.config(...rootConfig, {
  files: ['**/*.ts'],
  // languageOptions: {
  //   parserOptions: {
  //     projectService: {defaultProject: './tsconfig.app.json'},
  //   },
  // },
  rules: {
    '@angular-eslint/directive-selector': [
      'error',
      {
        type: 'attribute',
        prefix: 'quang',
        style: 'camelCase',
      },
    ],
    '@angular-eslint/component-selector': [
      'error',
      {
        type: 'element',
        prefix: 'quang',
        style: 'kebab-case',
      },
    ],
  },
})
