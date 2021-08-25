/**
 * @file Defines the story for the Bubble component.
 */

import Bubble from '~/components/Bubble'

export default {
  title: 'Components/Bubble',
  component: Bubble
}

/**
 * Returns the base story with text.
 * @returns {object} - The story object.
 */
export const Base = () => ({
  components: {
    Bubble
  },

  template: `
    <bubble wide>Bubble</bubble>
  `
})

/**
 * Returns an example of a number in the bubble.
 * @returns {object} - The story object.
 */
export const Counter = () => ({
  components: {
    Bubble
  },

  template: `
    <bubble>0</bubble>
  `
})

/**
 * Returns an example of a large number in the bubble.
 * @returns {object} - The story object.
 */
export const CounterLarge = () => ({
  components: {
    Bubble
  },

  template: `
    <bubble>275</bubble>
  `
})
