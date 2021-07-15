const path = require('path')

const root = path.resolve(__dirname, './')

export default {
  modules: [
    '@nuxtjs/style-resources'
  ],

  styleResources: {
    scss: [
      '@/styles/config/*.scss'
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
