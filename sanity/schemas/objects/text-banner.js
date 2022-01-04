/**
 * @file Defines the text banner section schema.
 */

export default {
  title: 'Text banner',
  name: 'textBanner',
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
      type: 'array', 
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      title: 'Social links',
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          title: 'Social link',
          name: 'socialLink',
          type: 'object',
          fields: [
            {
              title: 'Icon',
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Facebook',
                    value: 'social-facebook'
                  },
                  {
                    title: 'Instagram',
                    value: 'social-instagram'
                  },
                  {
                    title: 'Pinterest',
                    value: 'social-pinterest'
                  },
                  {
                    title: 'Twitter',
                    value: 'social-twitter'
                  },
                  {
                    title: 'Youtube',
                    value: 'social-youtube'
                  }
                ]
              }
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (rule) => rule.uri({
                allowRelative: true
              })
            }
          ]
        }
      ]
    }
  ]
}
