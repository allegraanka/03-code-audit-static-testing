/**
 * @file A full-width section for displaying an iFrame.
 */

import { text } from '../../scripts/styles'

export default {
  title: 'Embed block',
  name: 'embedBlock',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'url',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      title: 'Height',
      name: 'height',
      type: 'number'
    },
    {
      title: 'Width',
      name: 'width',
      type: 'number',
      description: 'Defaults to full width'
    },
    {
      title: 'Alignment',
      name: 'alignment',
      type: 'string',
      options: {
        list: text.alignment
      }
    },
    {
      title: 'Contain',
      name: 'contain',
      type: 'boolean',
      initialValue: false
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    }
  ]
}
