/**
 * @file A small notice showing a countdown to delivery offers.
 * @todo Make this work with props.
 * - Note that this relies on global Nuxt plugins and won't fully work in Storybook.
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
export const Base = createTemplate(DeliveryCountdown)
