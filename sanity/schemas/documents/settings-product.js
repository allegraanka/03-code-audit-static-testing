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
      name: 'itemAddOn',
      type: 'object',
      description: 'This product will be added to the cart when a line item has shoe care',
      fields: [
        {
          title: 'Handle',
          name: 'handle',
          type: 'string',
          initialValue: 'imbox-treatment',
          description: 'The product handle'
        },
        {
          title: 'Variant',
          name: 'variant',
          type: 'string',
          description: 'The variant to add to the cart'
        },
        {
          title: 'Label',
          name: 'label',
          type: 'string'
        },
        {
          title: 'Added label',
          name: 'addedLabel',
          type: 'string'
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
        },
        {
          title: 'Modal',
          name: 'modal',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
              initialValue: 'Imbox Terms & Conditions'
            },
            {
              title: 'Content',
              name: 'content',
              type: 'array',
              of: [
                {
                  type: 'block'
                },
                {
                  title: 'YouTube embed',
                  name: 'youTubeEmbed',
                  description: 'Add the video identifier (found within the URL)',
                  type: 'object',
                  fields: [
                    {
                      title: 'Video ID',
                      name: 'videoId',
                      type: 'string'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Size guide',
      name: 'sizeGuide',
      type: 'object',
      fields: [
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
          title: 'Guides',
          name: 'guides',
          type: 'array',
          of: [
            {
              title: 'Size guide',
              name: 'sizeGuide',
              type: 'sizeGuide'
            }
          ]
        }
      ]
    },
    {
      title: 'Delivery content',
      name: 'deliveryContent',
      type: 'object',
      fields: [
        {
          title: 'Highlights',
          name: 'highlights',
          type: 'array',
          of: [
            {
              type: 'blockContent'
            }
          ]
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
        }
      ]
    },
    {
      title: 'Returns content',
      name: 'returnsContent',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}
