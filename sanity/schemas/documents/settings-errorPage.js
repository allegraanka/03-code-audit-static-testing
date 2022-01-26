/**
 * @file Defines the schema for the 404 page.
 */

 export default {
    title: 'Settings / Error Page',
    name: 'settingsErrorPage',
    type: 'document',
    fields: [
      {
        title: 'Handle',
        name: 'handle',
        type: 'slug',
        hidden: true,
        validation: (rule) => rule.required(),
        initialValue: {
          current: 'settings-errorPage'
        }
      },
      {
        title: 'Message',
        name: 'message',
        type: 'string',
      },
      {
        title: 'Text',
        name: 'text',
        type: 'text',
      },
      {
        title: 'Link',
        name: 'link',
        type: 'object',
        fields: [
          {
            title: 'Label',
            name: 'label',
            type: 'string'
          },
          {
            title: 'URL',
            name: 'url',
            type: 'url',
            validation: (rule) => rule.uri({
              allowRelative: true
            })
          }
        ]
      },
      {
        title: 'Image',
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
