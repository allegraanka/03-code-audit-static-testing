/**
 * @file Holds sizes and additional content for a size guide.
 */

export default {
  title: 'Size guide',
  name: 'sizeGuide',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Sizes',
      name: 'sizes',
      type: 'array',
      of: [
        {
          title: 'Size',
          name: 'size',
          type: 'object',
          fields: [
            {
              title: 'UK',
              name: 'uk',
              type: 'string'
            },
            {
              title: 'European',
              name: 'european',
              type: 'string'
            },
            {
              title: 'US',
              name: 'us',
              type: 'string'
            },
            {
              title: 'Japanese',
              name: 'japanese',
              type: 'string'
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (rule) => rule.uri({
                allowRelative: true
              })
            }
          ]
        }
      ]
    },
    {
      title: 'Conditions',
      name: 'conditions',
      type: 'object',
      fields: [
        {
          title: 'Product handle',
          name: 'productHandle',
          type: 'nacelleData',
          options: {
            dataType: ['products']
          }
        },
        {
          title: 'Brand',
          name: 'brand',
          type: 'string'
        },
        {
          title: 'Product tag',
          name: 'productTag',
          type: 'string'
        },
        {
          title: 'Product type',
          name: 'productType',
          type: 'string'
        }
      ]
    }
  ]
}
