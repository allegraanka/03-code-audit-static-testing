/**
 * @file Defines the schema for a navigation menu item.
 */

export default {
  title: 'Menu item',
  name: 'menuItem',
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
    }
  ]
}
