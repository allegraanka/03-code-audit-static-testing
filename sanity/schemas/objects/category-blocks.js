/**
 * @file A banner with multiple, column-based rows.
 */

const blockSchema = {
  title: 'Block',
  name: 'categoryBlock',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
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

export default {
  title: 'Category blocks',
  name: 'categoryBlocks',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Rows',
      name: 'rows',
      type: 'array',
      of: [
        {
          title: '2 columns',
          name: '2',
          type: 'object',
          fields: [
            {
              title: 'Blocks',
              name: 'blocks',
              type: 'array',
              validation: (rule) => rule.max(2),
              of: [blockSchema]
            }
          ]
        },
        {
          title: '4 columns',
          name: '4',
          type: 'object',
          fields: [
            {
              title: 'Blocks',
              name: 'blocks',
              type: 'array',
              validation: (rule) => rule.max(4),
              of: [blockSchema]
            }
          ]
        },
        {
          title: '6 columns',
          name: '6',
          type: 'object',
          fields: [
            {
              title: 'Blocks',
              name: 'blocks',
              type: 'array',
              validation: (rule) => rule.max(6),
              of: [blockSchema]
            }
          ]
        }
      ]
    }
  ]
}
