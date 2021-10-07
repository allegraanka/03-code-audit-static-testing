/**
 * @file The story for the hero banner section.
 */

import { createTemplate } from '~/helpers/storybook'

import HeroBanner from '~/sections/HeroBanner'

export default {
  title: 'Sections/Hero Banner',
  component: HeroBanner,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(HeroBanner, {
  slides: [
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/production/b3580c9984bc295d9ee97786f3316def36a14ef4-1440x650.png'
        }
      },
      imageRatio: '16:9',
      buttonGroup: {
        buttons: [
          {
            link: '/collections/all',
            label: '3',
            _key: '5a4064abaa28'
          },
          {
            link: '/collections/all',
            label: '4',
            _key: 'b8ed8e0e41d6'
          },
          {
            link: '/collections/all',
            label: '5',
            _key: 'ca726ff49152'
          },
          {
            link: '/collections/all',
            label: '6',
            _key: 'e2f4e3b1f5b1'
          },
          {
            link: '/collections/all',
            label: '7',
            _key: '709273a9a934'
          }
        ],
        title: 'Shop By Size'
      },
      callToActions: [
        {
          link: '/collections/all',
          label: 'Shop Sandals',
          _key: '7c0fb454b1a1'
        },
        {
          link: '/collections/all',
          style: 'outlined',
          label: 'Shop New In',
          _key: '1c096502e131'
        }
      ],
      _key: '79374075d212',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non pellentesque mattis proin semper sed mauris.',
      title: 'New Summer Sandals'
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/production/fa5889afd69b7e394ec06472fc0f19e8213b460e-1480x1020.png'
        }
      },
      buttonGroup: {
        buttons: [
          {
            link: '/collections/all',
            label: '3',
            _key: 'dfa9596d9b48'
          },
          {
            link: '/collections/all',
            label: '4',
            _key: 'ac72e16a5c28'
          },
          {
            link: '/collections/all',
            label: '5',
            _key: '7032071191b4'
          },
          {
            link: '/collections/all',
            label: '6',
            _key: 'e635cda4fd5e'
          },
          {
            link: '/collections/all',
            label: '7',
            _key: '37647802b7d3'
          }
        ],
        title: 'Shop By Size'
      },
      callToActions: [
        {
          link: '/collections/all',
          label: 'Shop Women’s Sale',
          _key: 'a429799b6e20'
        }
      ],
      subtitle: "Women's Sale",
      style: 'sale',
      _key: 'd5e50c60e194',
      body: 'Selected Lines. While stocks last.',
      title: 'Save up to 60% Off RRP',
      imagePadding: true
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/production/b3580c9984bc295d9ee97786f3316def36a14ef4-1440x650.png'
        }
      },
      imageLink: '/collections/all',
      _key: '23262b712efb'
    }
  ]
})
