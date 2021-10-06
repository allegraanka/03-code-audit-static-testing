/**
 * @file The Nuxt.js configuration file.
 */

import path from 'path'

const root = path.resolve(__dirname, './')

export default {
  buildModules: ['@nuxtjs/svg', 'nuxt-graphql-request'],

  modules: ['@nuxtjs/style-resources', 'cookie-universal-nuxt', '@nuxtjs/i18n'],

  plugins: [
    { src: '~/scripts/plugins/nacelle.js' },
    { src: '~/scripts/plugins/sanity-portable-text.js' },
    { src: '~/scripts/plugins/settings.js' },
    { src: '~/scripts/plugins/vuex-persistedstate.js', mode: 'client' },
    { src: '~/scripts/plugins/lazysizes.js', mode: 'client' }
  ],

  i18n: {
    langDir: '@/locales/',
    locales: [
      {
        code: 'en',
        file: 'en.js'
      }
    ],
    strategy: 'no_prefix'
  },

  styleResources: {
    scss: ['@/styles/config/*.scss', '@/styles/app.scss']
  },

  router: {
    middleware: ['customer']
  },

  graphql: {
    clients: {
      shopify: {
        endpoint: `https://${process.env.SHOPIFY_STORE}/api/2021-07/graphql.json`,
        options: {
          headers: {
            'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_TOKEN
          }
        }
      }
    }
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
