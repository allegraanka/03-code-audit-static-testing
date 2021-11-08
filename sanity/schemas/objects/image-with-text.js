/**
 * @file Defines the Image with text section schema.
 */

import { colors, text } from '../../scripts/styles'

export default {
  title: 'Image with text',
  name: 'imageWithText',
  type: 'object',
  fields: [
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
      title: 'Call to action',
      name: 'callToAction',
      type: 'button'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Alt text',
      name: 'altText',
      type: 'string'
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
      title: 'Styles',
      name: 'styles',
      type: 'object',
      fields: [
        {
          title: 'Text color',
          name: 'textColor',
          type: 'string',
          options: {
            list: colors.themes.lightDark
          }
        },
        {
          title: 'Background color',
          name: 'backgroundColor',
          type: 'string',
          options: {
            list: colors.background
          }
        },
        {
          title: 'Text alignment',
          name: 'textAlignment',
          type: 'string',
          options: {
            list: text.alignment
          }
        }
      ]
    }
  ]
}
