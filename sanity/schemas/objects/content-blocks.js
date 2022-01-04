/**
 * @file Defines the content blocks section schema.
 */

export default {
  title: 'Content blocks',
  name: 'contentBlocks',
  type: 'object',
  fields: [
    {
      title: 'Sidebar title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Sidebar links',
      name: 'links',
      type: 'array',
      of: [
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
        }
      ]
    },
    {
      title: 'Content blocks',
      name: 'contentBlocks',
      type: 'array',
      of: [
        {
          title: 'Content block',
          name: 'contentBlock',
          type: 'object',
          fields: [
            {
              title: 'Icon',
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Phone',
                    value: 'misc-phone'
                  },
                  {
                    title: 'Pin',
                    value: 'misc-pin'
                  },
                  {
                    title: 'Heart',
                    value: 'misc-heart'
                  },
                  {
                    title: 'Email',
                    value: 'misc-email'
                  },
                  {
                    title: 'Fax',
                    value: 'misc-fax'
                  }
                ]
              }
            },
            {
              title: 'Text', 
              name: 'text',
              type: 'array', 
              of: [
                {
                  type: 'block'
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
