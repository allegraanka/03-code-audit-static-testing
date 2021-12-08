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
      title: 'Account Overview Callout',
      name: 'cta',
      type: 'object',
      fields: [
        {
          title: 'Image',
          name: 'image',
          type: 'image'
        },
        {
          title: 'Alt Text',
          name: 'altText',
          type: 'string'
        },
        {
          title: 'Title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Text',
          name: 'text',
          type: 'text',
        },
        {
          title: 'Button Text',
          name: 'buttonText',
          type: 'string',
        },
        {
          title: 'Button Link',
          name: 'buttonLink',
          type: 'url',
          validation: (rule) => rule.uri({
            allowRelative: true
          })
        }
      ]
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
