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
        title: 'Title',
        name: 'message',
        type: 'string'
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
