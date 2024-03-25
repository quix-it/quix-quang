const prettierConfigStandard = require('prettier-config-standard')

/** @type {import('prettier').Config} */
const config = {
  ...prettierConfigStandard,
  plugins: ['prettier-plugin-organize-attributes', '@trivago/prettier-plugin-sort-imports'],
  attributeGroups: [
    '$ANGULAR_INPUT',
    '$ANGULAR_OUTPUT',
    '$ANGULAR_TWO_WAY_BINDING',
    '$ANGULAR_STRUCTURAL_DIRECTIVE',
    '$DEFAULT'
  ],
  attributeSort: 'ASC',
  bracketSameLine: false,
  importOrder: [
    '^@angular/(.*)$',
    '^@ionic/(.*)$',
    '^@capacitor/(.*)$',
    '^@awesome-cordova-plugins/(.*)$',
    '<THIRD_PARTY_MODULES>',
    '^@quix/(.*)$',
    '^@environment(.*)$',
    '^@api(.*)$',
    '^@shared/(.*)$',
    '^@core/(.*)$',
    '^@store/(.*)$',
    '(.*)module(.*)',
    '(.*)service(.*)',
    '((.*)component(.*))|((.*)page(.*))',
    '((.*)apiModule(.*))|((.*)model(.*))',
    '(.*)feature(.*)',
    '(.*)actions(.*)',
    '(.*)effects(.*)',
    '(.*)selectors(.*)',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  printWidth: 120,
  singleAttributePerLine: true,
  overrides: [{ files: '*.page.html', options: { parser: 'angular' } }]
}

module.exports = config
