/**
 * @file Defines the stories for the global announcement banner.
 */

import { createTemplate } from '~/helpers/storybook'

import AnnouncementBanner from '~/components/AnnouncementBanner'

export default {
  title: 'Components/Announcement Banner',
  component: AnnouncementBanner,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the Base story with an example item.
 * @returns {object} - The base story.
 */
export const Base = createTemplate(AnnouncementBanner, {
  items: [
    {
      title: 'Express Delivery 7 Days a Week'
    }
  ]
})

/**
 * Exports the Base story with multiple items.
 * @returns {object} - The base story.
 */
export const Multiple = createTemplate(AnnouncementBanner, {
  items: [
    {
      title: 'Express Delivery 7 Days a Week',
      styles: {
        textColor: 'light',
        backgroundColor: 'dark'
      }
    },
    {
      title: 'Spend another £20.02 for FREE Standard UK Delivery',
      styles: {
        textColor: 'dark',
        backgroundColor: 'light'
      }
    },
    {
      title: 'Shop New Collection',
      styles: {
        textColor: 'dark',
        backgroundColor: 'white'
      }
    }
  ]
})
