/**
 * @file A full width navigation element.
 */

import MegaNavColumn from '~/components/MegaNavColumn'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Mega Nav Column',
  component: MegaNavColumn
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(MegaNavColumn, {
  title: "Women's",
  items: [
    {
      title: 'Slippers',
      link: '/collections/all'
    },
    {
      title: 'Clogs',
      link: '/collections/all'
    },
    {
      title: 'Sandals',
      link: '/collections/all'
    },
    {
      title: 'High Heel',
      link: '/collections/all'
    }
  ]
})
