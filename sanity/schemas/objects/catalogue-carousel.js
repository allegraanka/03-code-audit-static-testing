/**
 * @file Defines the catalogue carousel section schema.
 */

export default {
  title: 'Catalogue Carousel',
  name: 'catalogueCarousel',
  type: 'object',
  fields: [
    {
      title: 'Slides',
      name: 'slides',
      type: 'array',
      of: [
        {
          title: 'Slide',
          name: 'slide',
          type: 'object',
          fields: [
            {
              title: 'Image',
              name: 'image',
              type: 'image'
            },
            {
              title: 'Alt Text',
              name: 'altText',
              type: 'string'
            },
            {
              title: 'Products',
              name: 'products',
              type: 'array',
              validation: (rule) => rule.max(4),
              of: [
                {
                  title: 'Product',
                  name: 'product',
                  type: 'string',
                  description: 'The handle of the product'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Catalogue products title',
      name: 'title',
      type: 'string'
    }
  ]
}