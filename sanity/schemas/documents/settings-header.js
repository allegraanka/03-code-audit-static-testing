/**
 * @file Defines the schema for header settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

const columnsFields = [
  {
    title: 'Title',
    name: 'title',
    type: 'string'
  },
  {
    title: 'Menu items',
    name: 'menuItems',
    type: 'array',
    of: [
      {
        title: 'Menu item',
        name: 'menuItem',
        type: 'object',
        fields: [
          {
            title: 'Title',
            name: 'title',
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
    title: 'Display as grid',
    name: 'displayAsGrid',
    type: 'boolean',
    default: false
  }
]

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
      title: 'Menu items',
      name: 'menuItems',
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
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (rule) => rule.uri({
                allowRelative: true
              })
            },
            {
              title: 'Highlight',
              name: 'highlight',
              type: 'boolean',
              description: 'Will display the menu item highlighted'
            },
            {
              title: 'Menu items',
              name: 'menuItems',
              description: 'The primary list of links',
              type: 'array',
              of: [
                {
                  title: 'Menu item',
                  name: 'menuItem',
                  type: 'object',
                  fields: [
                    {
                      title: 'Title',
                      name: 'title',
                      type: 'string'
                    },
                    {
                      title: 'Link',
                      name: 'link',
                      type: 'url',
                      validation: (rule) => rule.uri({
                        allowRelative: true
                      })
                    },
                    {
                      title: 'Highlight',
                      name: 'highlight',
                      type: 'boolean',
                      description: 'Will display the menu item highlighted'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Columns',
              name: 'columns',
              description: 'Displays in a row on desktop',
              type: 'array',
              of: [
                {
                  title: 'Column',
                  name: 'column',
                  type: 'object',
                  fields: columnsFields
                }
              ]
            },
            {
              title: 'Additional columns',
              name: 'additionalColumns',
              description: 'Displays after the primary columns',
              type: 'array',
              of: [
                {
                  title: 'Column',
                  name: 'column',
                  type: 'object',
                  fields: columnsFields
                }
              ]
            },
            {
              title: 'Promotional banner',
              name: 'promotionalBanner',
              description: 'Displays above additional columns on desktop',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                },
                {
                  title: 'Subtitle',
                  name: 'subtitle',
                  type: 'string'
                },
                {
                  title: 'Button label',
                  name: 'buttonLabel',
                  type: 'string'
                },
                {
                  title: 'Button link',
                  name: 'buttonLink',
                  type: 'url',
                  validation: (rule) => rule.uri({
                    allowRelative: true
                  })
                },
                {
                  title: 'Image',
                  name: 'image',
                  type: 'image'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'Announcement bar',
      name: 'announcementBar',
      type: 'object',
      fields: [
        {
          title: 'Items',
          name: 'items',
          type: 'array',
          of: [
            {
              type: 'announcementItem'
            }
          ]
        },
        {
          title: 'Links',
          name: 'links',
          type: 'array',
          validation: (rule) => rule.max(3),
          of: [
            {
              title: 'Link',
              name: 'link',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                },
                {
                  title: 'Link',
                  name: 'link',
                  type: 'url',
                  validation: (rule) => rule.uri({
                    allowRelative: true,
                    scheme: ['https', 'http', 'mailto', 'tel']
                  })
                },
                {
                  title: 'Icon',
                  name: 'icon',
                  type: 'string',
                  options: {
                    list: [
                      {
                        title: 'Phone',
                        value: 'misc-phone'
                      },
                      {
                        title: 'Pin',
                        value: 'misc-pin'
                      },
                      {
                        title: 'Heart',
                        value: 'misc-heart'
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
