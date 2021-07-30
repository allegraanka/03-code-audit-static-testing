/**
 * @file Defines the schema for a page content type.
 */

export default {
  title: 'Pages',
  name: 'page',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Internal only'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      description: 'A unique identifier for the page'
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'contentSections'
    },
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
