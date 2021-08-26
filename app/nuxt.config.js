/**
 * @file The Nuxt.js configuration file.
 */

import path from 'path'

const root = path.resolve(__dirname, './')

export default {
  buildModules: ['@nuxtjs/svg'],

  modules: ['@nuxtjs/style-resources'],

  plugins: [
    { src: '~/scripts/plugins/nacelle.js' },
    { src: '~/scripts/plugins/settings.js' },
    { src: '~/scripts/plugins/vuex-persistedstate.js', mode: 'client' }
  ],

  styleResources: {
    scss: ['@/styles/config/*.scss']
  },

  storybook: {
    stories: ['~/stories/**/*.stories.js'],

    parameters: {
      layout: 'centered'
    },

    webpackFinal(config) {
      config.node = {
        fs: 'empty'
      }

      return config
    }
  },

  build: {
    extend(config) {
      config.resolve.alias['~'] = path.join(root, 'scripts')
      config.resolve.alias['@'] = path.join(root)

      config.node = {
        fs: 'empty'
      }
    }
  },

  publicRuntimeConfig: {
    NACELLE_SPACE: process.env.NACELLE_SPACE,
    NACELLE_TOKEN: process.env.NACELLE_TOKEN,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_TOKEN: process.env.SANITY_TOKEN,
    IS_PREVIEW: process.env.IS_PREVIEW
  },

  head: {
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }
    ]
  }
}
