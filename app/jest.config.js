/**
 * @file The Jest configuration file.
 */

const esModules = ['@nuxtjs/style-resources', '@nuxtjs/svg'].join('|')

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/scripts/**/*.*',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/store/**/*.vue'
  ],
  moduleFileExtensions: ['js', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  transformIgnorePatterns: [`node_modules/(?!${esModules})`]
}
