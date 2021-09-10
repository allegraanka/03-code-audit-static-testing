/**
 * @fine Defines the schema for global product settings.
 */

export default {
  title: 'Settings / Product',
  name: 'settingsProduct',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-product'
      }
    },
    {
      title: 'Low stock threshold',
      name: 'lowStockThreshold',
      type: 'object',
      fields: [
        {
          title: 'Threshold',
          name: 'threshold',
          type: 'number',
          description: 'When a variant\'s stock level is below this threshold a notice will display',
          initialValue: 5
        }
      ]
    },
    {
      title: 'Shoe care add-on',
      name: 'shoeCareAddOn',
      type: 'object',
      description: 'This product will be added to the cart when a line item has shoe care',
      fields: [
        {
          title: 'Handle',
          name: 'handle',
          type: 'string',
          description: 'The product handle'
        },
        {
          title: 'Variant',
          name: 'variant',
          type: 'string',
          description: 'The variant identifier'
        },
        {
          title: 'Details',
          name: 'details',
          type: 'array',
          of: [
            {
              type: 'block'
            }
          ]
        }
      ]
    },
    {
      title: 'Size guides',
      name: 'sizeGuides',
      type: 'array',
      of: [
        {
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
              title: 'Content',
              name: 'content',
              type: 'array',
              of: [
                {
                  type: 'block'
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
                  type: 'string'
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
      ]
    },
    {
      title: 'Delivery content',
      name: 'deliveryContent',
      type: 'text'
    },
    {
      title: 'Returns content',
      name: 'returnsContent',
      type: 'text'
    }
  ]
}
