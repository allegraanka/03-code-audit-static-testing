/**
 * @file Defines the schema for header settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings / Header',
  name: 'settingsHeader',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-header'
      }
    },
    {
      title: 'Menu',
      name: 'menu',
      type: 'reference',
      to: [
        {
          type: 'menu'
        }
      ]
    },
    {
      title: 'Announcement bar',
      name: 'announcementBar',
      type: 'object',
      fields: [
        {
          title: 'Phone number',
          name: 'phoneNumber',
          type: 'string'
        },
        {
          title: 'Items',
          name: 'items',
          type: 'array',
          of: [
            {
              title: 'Item',
              name: 'item',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
