/**
 * @file Defines the schema for SEO settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings / SEO',
  name: 'settingsSeo',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-seo'
      }
    },
    {
      title: 'Title and meta description',
      name: 'metadata',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          initialValue: 'Pavers'
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
