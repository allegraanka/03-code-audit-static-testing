/**
 * @file Defines the schema for the Block content section.
 */

export default {
  title: 'Block content',
  name: 'blockContent',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    }
  ]
}
