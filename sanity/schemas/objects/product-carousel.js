/**
 * @file The schema settings for the product carousel.
 */

export default {
  title: 'Product Carousel',
  name: 'productCarousel',
  type: 'object',
  fields: [
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          title: 'Handle',
          name: 'handle',
          type: 'slug'
        }
      ]
    }
  ]
}
