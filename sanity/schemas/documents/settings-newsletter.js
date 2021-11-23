/**
 * @file Defines the schema for the Newsletter Modal
 */

export default {
  title: 'Settings / Modals / Newsletter',
  name: 'settingsNewsletter',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-newsletter'
      }
    },
    {
      title: 'Popup Image',
      name: 'image',
      type: 'image',
      fields: [
        {
          title: 'Alt Text',
          name: 'altText',
          type: 'string',
          options: {
            isHighlighted: true // <-- make this field easily accessible
          }
        },
      ]
    },
    {
      title: 'Sign up Message',
      name: 'signUpMessage',
      type: 'text',
      description: 'Message displayed when popup open'
    },
    {
      title: 'Success Message',
      name: 'successMessage',
      type: 'text',
      description: 'Message displayed when a user subscribes'
    },
  ]
}
