/**
 * @file Defines the call to action section schema.
 */

export default {
  title: 'Call To Action',
  name: 'callToAction',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Button',
      name: 'button',
      type: 'button'
    }
  ]
}