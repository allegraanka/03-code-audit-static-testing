/**
 * @file The main navigation component used in the header.
 */

import AppNav from '~/components/AppNav'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/App Nav',
  component: AppNav
}

/**
 * Exports the base app nav story.
 */
export const Base = createTemplate(AppNav, {
  items: [
    {
      title: "Women's",
      link: '/collections/all'
    },
    {
      title: "Men's",
      link: '/collections/all'
    },
    {
      title: 'Sale',
      link: '/collections/all',
      highlight: true
    }
  ]
})
