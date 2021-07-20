/**
 * @file Defines the schema for settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings',
  name: 'settings',
  type: 'document',
  fields: [
    {
      title: 'Title and meta description',
      name: 'metadata',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Description',
          name: 'description',
          type: 'text'
        }
      ]
    }
  ]
}
