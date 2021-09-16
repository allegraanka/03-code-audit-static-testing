/**
 * @file Defines the schema for the announcement banner items.
 */

import { colors } from '../../scripts/styles'

export default {
  title: 'Announcement Item',
  name: 'announcementItem',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
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
        }
      ]
    }
  ]
}
