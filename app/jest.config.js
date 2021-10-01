/**
 * @file The Jest configuration file for e2e and unit tests.
 */

const esModules = [
  '@nuxtjs/style-resources',
  '@nuxtjs/svg',
  '@nuxtjs/i18n'
].join('|')

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/scripts/**/*.*',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*.vue'
  ],
  moduleFileExtensions: ['js', 'vue', 'json', 'gql'],
  moduleNameMapper: {
    '.+\\.(svg)(\\?inline)?$': '<rootDir>/tests/utils/svg-transform.js',
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/scripts/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '\\.(gql|graphql)$': 'jest-transform-graphql'
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`]
}
