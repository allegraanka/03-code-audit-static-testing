/**
 * @file A small notice showing a countdown to delivery offers.
 */

import DeliveryCountdown from '~/components/DeliveryCountdown'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Delivery Countdown',
  component: DeliveryCountdown
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(DeliveryCountdown, {
  title: 'Want Next Day Delivery?',
  body: 'Order soon to receive your order on Friday 3rd September when you select express delivery for £4.99!',
  endDateTime: '10/4/2021 11:15'
})
