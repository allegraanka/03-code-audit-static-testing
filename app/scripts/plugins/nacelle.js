/**
 * @file Injects a Nacelle client and helpers into the Nuxt.js context.
 */

import Nacelle from '@nacelle/client-js-sdk'
import { createSanityPreviewConnector } from '@nacelle/sanity-preview-connector'

/**
 * Instance globals.
 */
const settings = {
  collections: {
    itemsPerPage: 24,
    initialPage: 1
  },
  blogs: {
    itemsPerPage: 2,
    initialPage: 1
  }
}

export default ({ $config }, inject) => {
  /**
   * Set up the Nacelle client.
   * - If preview mode is enabled, use the preview connector.
   */
  const client = new Nacelle({
    id: $config.NACELLE_SPACE,
    token: $config.NACELLE_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
    useStatic: false
  })

  /**
   * If preview mode is enabled, set up a preview.
   * - Connects with Sanity directly for draft pages.
   */
  if ($config.IS_PREVIEW) {
    const previewConnector = createSanityPreviewConnector(client, {
      sanityConfig: {
        projectId: $config.SANITY_PROJECT_ID,
        dataset: $config.SANITY_DATASET,
        token: $config.SANITY_TOKEN
      },
      sectionsProjection: 'sections'
    })

    client.data.update({
      connector: previewConnector
    })
  }

  inject('nacelle', {
    /**
     * Creates a new Nacelle client.
     * - https://docs.getnacelle.com/api-reference/client-js-sdk.html
     */
    client,

    /**
     * Fetches a collection by it's handle.
     *
     * @param {string} handle - The collection handle.
     * @param {number} page - The page to fetch.
     * @returns {Promise} - The collection object.
     */
    async collectionByHandle(handle, page = settings.collections.initialPage) {
      const { itemsPerPage } = settings.collections

      return this.client.data
        .collection({ handle })
        .then(async (collection) => {
          const products = await this.collectionProductsByHandle(handle, page)

          return {
            ...collection,
            products: products && {
              items: products,
              pages: Math.ceil(
                collection.productLists[0].handles.length / itemsPerPage
              )
            }
          }
        })
    },

    /**
     * Fetches the products of a collection.
     *
     * @param {string} handle - The collection handle.
     * @param {number} page - The page number.
     * @returns {Promise} - Resolves with product and page data.
     */
    collectionProductsByHandle(
      handle,
      page = settings.collections.initialPage
    ) {
      const { itemsPerPage } = settings.collections

      return this.client.data.collectionPage({
        handle,
        itemsPerPage: itemsPerPage * page,
        index: page === 1 ? 0 : itemsPerPage * (page - 1),
        paginate: true
      })
    },

    /**
     * Fetches a page by it's handle.
     *
     * @param {string} handle - The page handle.
     * @returns {Promise} - The page object.
     */
    pageByHandle(handle) {
      return this.client.data.page({
        handle
      })
    },

    /**
     * Fetches content by it's handle.
     *
     * @param {string} handle - The content handle.
     * @param {string} type - The content type, defaults to handle value.
     * @returns {Promise} - The page object.
     */
    contentByHandle(handle, type = handle) {
      return this.client.data.content({
        handle,
        type
      })
    },

    /**
     * Fetches a product by it's handle.
     *
     * @param {string} handle - The product handle.
     * @returns {Promise} - The product object.
     */
    productByHandle(handle) {
      return this.client.data.product({
        handle
      })
    },

    /**
     * Fetches a blog and it's articles.
     *
     * @param {string} handle - The blog handle.
     * @param {number} page - The page number to fetch.
     * @returns {Promise} - The blog promise.
     */
    blogByHandle(handle, page = settings.blogs.initialPage) {
      const { itemsPerPage } = settings.blogs

      return this.client.data.blog({ handle }).then(async (blog) => {
        const list = blog.articleLists.find(({ slug }) => slug === 'default')
        const total = list ? list.handles.length : 1
        const articles = await this.blogArticlesByHandle(handle, page)

        return {
          ...blog,
          articles: articles && {
            items: articles,
            pages: Math.ceil(total / itemsPerPage)
          }
        }
      })
    },

    /**
     * Returns the articles for a blog.
     *
     * @param {string} handle - The blog handle.
     * @param {number} page - The page to fetch.
     * @returns {Array} - The array of articles.
     */
    blogArticlesByHandle(handle, page = settings.collections.initialPage) {
      const { itemsPerPage } = settings.blogs

      return this.client.data.blogPage({
        handle,
        itemsPerPage: itemsPerPage * page,
        index: page === 1 ? 0 : itemsPerPage * (page - 1),
        paginate: true
      })
    },

    /**
     * Fetches an article by it's route params.
     *
     * @param {object} params - The page params object.
     * @param {string} params.blog - The blog handle.
     * @param {string} params.handle - The article handle.
     * @returns {Promise} - The article Promise.
     */
    articleByParams({ blog, handle }) {
      return this.client.data.article({
        handle,
        blogHandle: blog
      })
    },

    helpers: {
      /**
       * Finds a metafield in an array of metafields.
       *
       * @param {Array} metafields - The metafields array.
       * @param {string} path - `namespace.key` string.
       * @returns {?} - The metafield value.
       */
      findMetafield(metafields, path) {
        const field = metafields.find(
          (metafield) => `${metafield.namespace}.${metafield.key}` === path
        )

        return field?.value || null
      }
    }
  })
}
