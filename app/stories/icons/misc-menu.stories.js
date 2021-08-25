/**
 * @file Defines the story for the menu icon.
 */
import IconMenu from '@/assets/icons/misc-menu.svg?inline'

export default {
  title: 'Icons/Misc/Menu'
}

export const Base = () => ({
  components: {
    IconMenu
  },

  template: '<icon-menu />'
})
