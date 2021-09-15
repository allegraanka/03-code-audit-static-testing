/**
 * @file Defines the story for the error icon.
 */
import IconError from '@/assets/icons/misc-error.svg?inline'

export default {
  title: 'Styles/Icons/Misc/Error'
}

export const Base = () => ({
  components: {
    IconError
  },

  template: '<icon-error />'
})
