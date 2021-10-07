/**
 * @file A full-width banner with image and content.
 */

import { colors } from '../../scripts/styles'

export default {
  title: 'Hero banner',
  type: 'object',
  name: 'heroBanner',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Internal only'
    },
    {
      title: 'Slides',
      name: 'slides',
      type: 'array',
      of: [
        {
          title: 'Slide',
          name: 'slide',
          type: 'object',
          fields: [
            {
              title: 'Style',
              name: 'style',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Sale',
                    value: 'sale'
                  }
                ]
              }
            },
            {
              title: 'Subtitle',
              name: 'subtitle',
              type: 'string'
            },
            {
              title: 'Title',
              name: 'title',
              type: 'string'
            },
            {
              title: 'Body',
              name: 'body',
              type: 'text'
            },
            {
              title: 'Call to actions',
              name: 'callToActions',
              type: 'array',
              validation: (rule) => rule.max(2),
              of: [
                {
                  type: 'button'
                }
              ]
            },
            {
              title: 'Button group',
              name: 'buttonGroup',
              type: 'object',
              fields: [
                {
                  title: 'Title',
                  name: 'title',
                  type: 'string'
                },
                {
                  title: 'Buttons',
                  name: 'buttons',
                  type: 'array',
                  validation: (rule) => rule.max(5),
                  of: [
                    {
                      type: 'button'
                    }
                  ]
                }
              ]
            },
            {
              title: 'Image',
              name: 'image',
              type: 'image'
            },
            {
              title: 'Image ratio',
              name: 'imageRatio',
              type: 'string',
              options: {
                list: [
                  {
                    title: '4:5',
                    value: '4:5'
                  },
                  {
                    title: '9:16',
                    value: '9:16'
                  }
                ]
              }
            },
            {
              title: 'Image padding',
              name: 'imagePadding',
              type: 'boolean',
              default: false
            },
            {
              title: 'Image link',
              name: 'imageLink',
              type: 'url',
              validation: (rule) => rule.uri({
                allowRelative: true
              })
            },
            {
              title: 'Video',
              name: 'video',
              type: 'file',
              description: 'Overrides the image'
            }
          ]
        }
      ]
    }
  ]
}
