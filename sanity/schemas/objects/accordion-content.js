/**
 * @file Defines the schema for the Accordion content section.
 */

 export default {
    title: 'Accordion content',
    name: 'accordionContent',
    type: 'object',
    fields: [
      {
        title: 'Title',
        name: 'title',
        type: 'string'
      },
      {
        title: 'Items',
        name: 'items',
        type: 'array',
        of: [
          {
            name: 'Content',
            type: 'object',
            fields: [
              {
                title: 'Title',
                name: 'title',
                type: 'string'
              },
              {
                name: 'content',
                type: 'blockContent'
              },
              {
                name: 'table',
                title: 'Table',
                type: 'table'
              },
            ]
          }

        ]
      }
    ]
  }
