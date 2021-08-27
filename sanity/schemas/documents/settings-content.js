/**
 * @file Defines the schema for content settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

 export default {
  title: 'Settings / Content',
  name: 'settingsContent',
  type: 'document',
  liveEdit: true,
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      initialValue: {
        current: 'settings-content'
      }
    },
    {
      title: 'Navigation',
      name: 'navigation',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          initialValue: 'Menu'
        }
      ]
    },
    {
      title: 'Cart',
      name: 'cart',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          initialValue: 'Basket'
        }
      ]
    },
    {
      title: 'Product',
      name: 'product',
      type: 'object',
      fields: [
        {
          title: 'Description Toggle',
          name: 'descriptionToggle',
          type: 'string',
          initialValue: 'Read Product Description'
        },
        {
          title: 'Add to Cart',
          name: 'addToCart',
          type: 'object',
          fields: [
            {
              title: 'Unavailable',
              name: 'unavailable',
              type: 'string',
              initialValue: 'Unavailable'
            },
            {
              title: 'Out of stock',
              name: 'outOfStock',
              type: 'string',
              initialValue: 'Out of stock'
            },
            {
              title: 'Add to cart',
              name: 'addToCart',
              type: 'string',
              initialValue: 'Add to cart'
            }
          ]
        }
      ]
    }
  ]
}
