/**
 * @file Defines the schema for a menu.
 */

export default {
  title: 'Menus',
  name: 'menu',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
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
              title: 'Name',
              name: 'name',
              type: 'string'
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              description: 'Optional',
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
              title: 'Children',
              name: 'children',
              type: 'array',
              of: [
                {
                  title: 'Child',
                  name: 'child',
                  type: 'object',
                  fields: [
                    {
                      title: 'Name',
                      name: 'name',
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
                      title: 'Menu items',
                      name: 'menuItems',
                      type: 'array',
                      of: [
                        {
                          type: 'menuItem'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              title: 'Promotional banner',
              name: 'promotionalBanner',
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
                  title: 'Button',
                  name: 'button',
                  type: 'button'
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
    }
  ]
}
