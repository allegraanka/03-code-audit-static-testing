/**
 * @file Defines the schema for footer settings document.
 * @see https://www.sanity.io/docs/structure-builder-typical-use-cases#c22ce054acba
 */

export default {
  title: 'Settings / Footer',
  name: 'settingsFooter',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-footer'
      }
    },
    {
      title: 'Menu',
      name: 'menu',
      type: 'reference',
      to: [
        {
          type: 'menu'
        }
      ]
    },
    {
      title: 'Contact Details',
      name: 'contactDetails',
      type: 'object',
      fields: [
        {
          title: 'Email',
          name: 'email',
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Text',
              name: 'text',
              type: 'string',
            },
          ]
        },
        {
          title: 'Phone',
          name: 'phone',
          type: 'object',
          fields: [
            {
              title: 'Primary phone title',
              name: 'primaryPhoneTitle',
              type: 'string',
            },
            {
              title: 'Primary phone text',
              name: 'primaryPhoneText',
              type: 'string',
            },
            {
              title: 'Secondary phone title',
              name: 'secondaryPhoneTitle',
              type: 'string',
            },
            {
              title: 'Secondary phone text',
              name: 'secondaryPhoneText',
              type: 'string',
            },
          ]
        },
        {
          title: 'Address Line 1',
          name: 'addressFirstLine',
          type: 'string'
        },
        {
          title: 'Address Line 2',
          name: 'addressSecondLine',
          type: 'string'
        }
      ]
    },
    {
      title: 'Newsletter signup',
      name: 'newsletterSignup',
      type: 'object',
      fields: [
        {
          title: 'Heading',
          name: 'heading',
          type: 'string'
        },
        {
          title: 'Text',
          name: 'text',
          type: 'text'
        }
      ]
    },
    {
      title: 'Copyright notice',
      name: 'copyrightNotice',
      type: 'string'
    },
    {
      title: 'Link list',
      name: 'linkList',
      type: 'array',
      of: [
        {
          type: 'menuItem'
        }
      ]
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image'
    },
    {
      title: 'Logo alt text',
      name: 'logoAltText',
      type: 'string'
    }
  ]
}
