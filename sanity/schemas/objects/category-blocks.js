/**
 * @file A banner with multiple, column-based rows.
 */

import { colors } from '../../scripts/styles'

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
          title: 'Row',
          name: 'row',
          type: 'object',
          fields: [
            {
              title: 'Blocks',
              name: 'blocks',
              type: 'array',
              validation: (rule) => rule.max(6),
              of: [
                {
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
                    },
                    {
                      title: 'Style',
                      name: 'style',
                      type: 'object',
                      fields: [
                        {
                          title: 'Text color',
                          name: 'textColor',
                          type: 'string',
                          options: {
                            list: colors.brand
                          }
                        }
                      ]
                    },
                    {
                      title: 'iFrame override',
                      name: 'iframe',
                      type: 'string',
                      description: 'Add a URL, which will be rendered as an iFrame (overrides all other content)'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
