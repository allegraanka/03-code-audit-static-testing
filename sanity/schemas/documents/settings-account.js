/**
 * @file Defines the schema for the account templates.
 */

export default {
  title: 'Settings / Account',
  name: 'settingsAccount',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-account'
      }
    },
    {
      title: 'Register Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Alt Text',
      name: 'altText',
      type: 'string'
    }
  ]
}
