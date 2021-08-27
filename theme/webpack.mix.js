/**
 * @file Webpack configuration file using Laravel Mix API.
 * - https://laravel-mix.com/docs/4.0/mixjs
 */

const mix = require('laravel-mix')

Mix.manifest.refresh = _ => void 0

const themePath = './src'
const buildPath = './dist'

mix
  .setPublicPath('dist')
  .js(`${themePath}/scripts/checkout.js`, `${buildPath}/assets/checkout.js`)
  .sass(`${themePath}/styles/checkout.scss`, `${buildPath}/assets/checkout.scss`)
  .copy(`${themePath}/snippets`, `${buildPath}/snippets`)
  .copy(`${themePath}/layout`, `${buildPath}/layout`)
  .copy(`${themePath}/templates`, `${buildPath}/templates`)
  .copy(`${themePath}/config`, `${buildPath}/config`)
