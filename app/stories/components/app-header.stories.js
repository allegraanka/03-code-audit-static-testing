/**
 * @file Defines stories for the header component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppHeader from '~/components/AppHeader'

export default {
  title: 'Components/App Header',
  component: AppHeader,

  parameters: {
    layout: 'fullscreen'
  }
}

const baseProps = {
  menuItems: [
    {
      title: 'Men',
      to: '/collections/men'
    },
    {
      title: 'Women',
      to: '/collections/women'
    }
  ]
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppHeader, baseProps)

/**
 * The header including an announcement banner.
 * @returns {object} - The announcement instance.
 */
export const WithAnnouncement = createTemplate(AppHeader, {
  ...baseProps,

  announcementItems: [
    {
      title: 'Express Delivery 7 Days a Week'
    }
  ]
})
