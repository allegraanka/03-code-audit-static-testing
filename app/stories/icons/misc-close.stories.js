/**
 * @file Defines the story for the close icon.
 */
import IconClose from '@/assets/icons/misc-close.svg?inline'

export default {
  title: 'Icons/Misc/Close'
}

export const Base = () => ({
  components: {
    IconClose
  },

  template: '<icon-close />'
})
