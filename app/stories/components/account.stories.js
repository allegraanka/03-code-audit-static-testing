/**
 * @file Defines the story for the account component.
 */

import Account from '~/components/Account'

export default {
  title: 'Components/Account',
  component: Account,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story with example slot.
 * @returns {object} - The base story.
 */
export const Base = () => ({
  components: {
    Account
  },

  template: `
    <account>
      Account content
    </account>
  `
})
