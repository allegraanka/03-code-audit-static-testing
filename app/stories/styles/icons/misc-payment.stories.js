/**
 * @file Defines the story for the payment icon.
 */
import IconPayment from '@/assets/icons/misc-payment.svg?inline'

export default {
  title: 'Styles/Icons/Misc/Payment'
}

export const Base = () => ({
  components: {
    IconPayment
  },

  template: '<icon-payment />'
})
