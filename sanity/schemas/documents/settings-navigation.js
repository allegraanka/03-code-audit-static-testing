/**
 * @file Defines the schema for navigation settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings / Navigation',
  name: 'settingsNavigation',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      initialValue: {
        current: 'settings-navigation'
      }
    },
    {
      title: 'Header',
      name: 'header',
      type: 'object',
      fields: [
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
        }
      ]
    },
    {
      title: 'Footer',
      name: 'footer',
      type: 'object',
      fields: [
        {
          title: 'Menu',
          name: 'menu',
          type: 'reference',
          to: [
            {
              type: 'menu'
            }
          ]
        }
      ]
    }
  ]
}
