/**
 * @file The Nuxt.js configuration file.
 */

import open from 'opn'
import path from 'path'

const root = path.resolve(__dirname, './')

export default {
  modules: [
    '@nuxtjs/style-resources'
  ],

  plugins: [
    { src: '~/scripts/plugins/nacelle.js' }
  ],

  styleResources: {
    scss: [
      '@/styles/config/*.scss'
    ]
  },

  storybook: {
    stories: [
      '~/stories/**/*.stories.js'
    ]
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

  hooks: {
    listen(_server, { host, port, https }) {
      open(`http${https ? 's' : ''}://${host}:${port}`)
    }
  },

  publicRuntimeConfig: {
    NACELLE_SPACE: process.env.NACELLE_SPACE,
    NACELLE_TOKEN: process.env.NACELLE_TOKEN
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
