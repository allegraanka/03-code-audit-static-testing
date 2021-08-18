/**
 * @file Defines the configuration for stylelint.
 */

module.exports = {
  extends: '@we-make-websites/stylelint-config',
  plugins: [
    'stylelint-scss'
  ],
  rules: {
    'max-nesting-depth': 6,
    'scss/partial-no-import': null
  }
}
