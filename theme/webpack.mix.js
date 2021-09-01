/**
 * @file Webpack configuration file using Laravel Mix API.
 * - https://laravel-mix.com/docs/4.0/mixjs
 */

const mix = require('laravel-mix')

Mix.manifest.refresh = _ => void 0

const themePath = './src'
const buildPath = `${themePath}/assets`

mix
  .js(`${themePath}/scripts/checkout.js`, buildPath)
  .sass(`${themePath}/styles/checkout.scss`, buildPath)
  .sass(`${themePath}/styles/gift_card.scss`, buildPath)
