/**
 * @file Showcases the link element used in the announcement banner.
 */

import AnnouncementBannerLink from '~/components/AnnouncementBannerLink'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Announcement Banner Link',
  component: AnnouncementBannerLink
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(AnnouncementBannerLink, {
  title: 'Express Delivery 7 Days a Week',
  icon: 'misc-phone',
  link: '/'
})
