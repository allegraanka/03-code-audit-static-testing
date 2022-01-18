/**
 * @file Defines the sign up form section schema.
 */

export default {
  title: 'Sign Up Form',
  name: 'signUpForm',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Text',
      name: 'text',
      type: 'text'
    },
    {
      title: 'Offers checkbox label',
      name: 'offersCheckboxLabel',
      type: 'string'
    },
    {
      title: 'Subscribe checkbox label',
      name: 'subscribeCheckboxLabel',
      type: 'string'
    },
    {
      title: 'ID',
      name: 'id',
      type: 'string'
    }
  ]
}