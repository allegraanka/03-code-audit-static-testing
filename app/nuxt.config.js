const path = require('path')

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
