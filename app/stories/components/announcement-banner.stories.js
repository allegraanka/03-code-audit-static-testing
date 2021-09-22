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
      title: 'Express Delivery 7 Days a Week'
    },
    {
      title: 'Spend another £20.02 for FREE Standard UK Delivery'
    },
    {
      title: 'Shop New Collection'
    }
  ]
})

/**
 * Exports the Base story with links.
 * @returns {object} - The base story.
 */
export const WithLinks = createTemplate(AnnouncementBanner, {
  items: [
    {
      title: 'Express Delivery 7 Days a Week'
    },
    {
      title: 'Spend another £20.02 for FREE Standard UK Delivery'
    },
    {
      title: 'Shop New Collection'
    }
  ],

  links: [
    {
      title: '0344 844 0809',
      link: 'tel:03448440809',
      icon: 'misc-phone'
    },
    {
      title: 'Store Locator',
      link: '/collections/all',
      icon: 'misc-pin'
    },
    {
      title: 'Wishlist',
      link: '/collections/all',
      icon: 'misc-heart'
    }
  ]
})
