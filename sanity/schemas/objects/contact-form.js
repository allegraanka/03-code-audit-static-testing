/**
 * @file Defines the contact form section schema.
 */

export default {
  title: 'Contact form',
  name: 'contactForm',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Form src',
      name: 'form',
      type: 'string'
    }
  ]
}
