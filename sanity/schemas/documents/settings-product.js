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
              title: 'Tag conditions',
              name: 'tagConditions',
              type: 'string',
              description: 'A comma separated list of product tags to conditionally show this size guide'
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
