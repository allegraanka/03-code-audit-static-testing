/**
 * @file Defines the Image with text section schema.
 */

export default {
  title: 'Image with text',
  name: 'imageWithText',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'text'
    },
    {
      title: 'Call to action',
      name: 'callToAction',
      type: 'button'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    }
  ]
}
