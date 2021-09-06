/**
 * @file Defines the schema for footer settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings / Footer',
  name: 'settingsFooter',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      initialValue: {
        current: 'settings-footer'
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
      title: 'Copyright notice',
      name: 'copyrightNotice',
      type: 'string'
    },
    {
      title: 'Link list',
      name: 'linkList',
      type: 'array',
      of: [
        {
          type: 'menuItem'
        }
      ]
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image'
    }
  ]
}
