/**
 * @file Defines stories for the footer component.
 */

import { createTemplate } from '~/helpers/storybook'

import AppFooter from '~/components/AppFooter'

export default {
  title: 'Components/App Footer',
  component: AppFooter,

  parameters: {
    layout: 'fullscreen'
  }
}

const baseProps = {
  content: {
    linkList: [
      {
        link: '/',
        name: 'Privacy Policy & Cookies'
      },
      {
        link: '/',
        name: 'Terms & Conditions'
      }
    ],

    newsletterSignup: {
      heading: 'Sign up to our newsletter',
      text: 'Subscribe to receive regular news and offers from Pavers. You can unsubscribe at any time.'
    },

    menu: {
      items: [
        {
          name: 'Pavers Shoes',
          children: [
            {
              link: '/collections/womens',
              name: "Women's"
            },
            {
              link: '/collections/mens',
              name: "Men's"
            }
          ]
        },
        {
          name: 'Help',
          children: [
            {
              link: '/',
              name: 'Customer Services'
            },
            {
              link: '/collections/mens',
              name: 'Contact Us'
            }
          ]
        }
      ]
    }
  }
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AppFooter, baseProps)
