/**
 * @file A full-width banner with image and content.
 */

export default {
  title: 'Hero Banner',
  type: 'object',
  name: 'heroBanner',
  fields: [
    {
      type: 'string',
      name: 'title',
      title: 'Title'
    },
    {
      type: 'image',
      name: 'image',
      title: 'Image'
    }
  ]
}
