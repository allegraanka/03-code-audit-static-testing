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
 * Exports the Base story with example items.
 * @returns {object} - The base story.
 */
export const Base = createTemplate(AnnouncementBanner, {
  items: [
    {
      title: 'Express Delivery 7 Days a Week'
    }
  ]
})
