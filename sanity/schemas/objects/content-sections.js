/**
 * @file Defines the schema for the Content Sections type.
 */

export default {
  title: 'Content Sections',
  name: 'contentSections',
  type: 'object',
  fields: [
    {
      type: 'array',
      name: 'sections',
      title: 'Content',
      of: [
        {
          type: 'heroBanner'
        },
        {
          type: 'productCarousel'
        }
      ]
    }
  ]
}
