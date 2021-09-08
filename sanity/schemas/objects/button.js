/**
 * @file Defines the schema for a re-usable button.
 */

export default {
  title: 'Button',
  name: 'button',
  type: 'object',
  fields: [
    {
      title: 'Label',
      name: 'label',
      type: 'string'
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: (rule) => rule.uri({
        allowRelative: true
      })
    },
    {
      title: 'Style',
      name: 'style',
      type: 'string',
      options: {
        list: [
          {
            title: 'Outlined',
            value: 'outlined'
          }
        ]
      }
    }
  ]
}
