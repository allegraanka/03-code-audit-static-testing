/**
 * @file A full width navigation element.
 */

import MegaNav from '~/components/MegaNav'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Mega Nav',
  component: MegaNav,
  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(MegaNav, {
  links: [
    {
      title: 'New In',
      link: '/collections/all'
    },
    {
      title: 'Clearance',
      link: '/collections/all'
    },
    {
      title: 'Sale',
      link: '/collections/all',
      highlight: true
    }
  ],
  columns: [
    {
      title: "Women's",
      menuItems: [
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
    },
    {
      title: "Men's",
      menuItems: [
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
        },
        {
          title: 'Low Heel',
          link: '/collections/all'
        }
      ]
    }
  ],
  secondaryColumns: [
    {
      title: "Women's",
      displayAsGrid: true,
      menuItems: [
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
    },
    {
      title: "Men's",
      displayAsGrid: true,
      menuItems: [
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
        },
        {
          title: 'Low Heel',
          link: '/collections/all'
        }
      ]
    }
  ],
  banner: {
    title: 'Get set for summer with 10% off our Gardening collection',
    subtitle: 'Limited time only. while stocks last.',
    buttonLabel: 'Shop Now',
    buttonLink: '/collections/all',
    image: {
      asset: {
        url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c214b089b9ccc77537851febbaeb0a5fde20c99a-2656x192.png'
      }
    }
  }
})
