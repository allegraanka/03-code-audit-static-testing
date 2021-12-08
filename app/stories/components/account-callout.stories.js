/**
 * @file Defines the story for the account callout.
 */

import { createTemplate, decorators } from '~/helpers/storybook'

import AccountCallout from '~/components/AccountCallout'

export default {
  title: 'Components/Account Callout',
  component: AccountCallout,
  decorators: [decorators.lineLarge]
}

const props = {
  content: {
    title: 'The Pavers Catalouge',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque et tincidunt quam, a consequat velit. Morbi massa magna.',
    image: {
      asset: {
        url: 'https://cdn.sanity.io/images/sv3k3p3d/development/414815dd4f077abccc9470315614053aaeff2aea-1536x1012.jpg'
      }
    },
    altText: 'The Pavers Catalouge',
    buttonText: 'Sign up',
    buttonLink: '/'
  }
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(AccountCallout, props)
