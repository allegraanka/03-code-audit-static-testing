/**
 * @file Defines stories for the footer component.
 */

import AppFooter from '~/components/AppFooter'

export default {
  title: 'Components/App Footer'
}

export const base = () => ({
  components: {
    AppFooter
  },

  template: `
    <app-footer />
  `
})
