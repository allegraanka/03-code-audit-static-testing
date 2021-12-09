/**
 * @file Defines settings for collection pages.
 */

export default {
  title: 'Settings / Collection',
  name: 'settingsCollection',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-collection'
      }
    },
    {
      title: 'Filtering',
      name: 'filtering',
      type: 'object',
      fields: [
        {
          title: 'Attributes',
          name: 'attributes',
          type: 'array',
          of: [
            {
              title: 'Attribute',
              name: 'attribute',
              type: 'object',
              fields: [
                {
                  title: 'Name',
                  name: 'name',
                  type: 'string',
                  description: 'The attribute name as it exists in Algolia'
                },
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string',
                  description: 'Displayed to the customer'
                },
                {
                  title: 'Type',
                  name: 'type',
                  type: 'string',
                  description: 'Defaults to a list of checkboxes',
                  options: {
                    list: [
                      {
                        title: 'Grid',
                        value: 'grid'
                      },
                      {
                        title: 'Swatches',
                        value: 'swatches'
                      },
                      {
                        title: 'Range',
                        value: 'range'
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
