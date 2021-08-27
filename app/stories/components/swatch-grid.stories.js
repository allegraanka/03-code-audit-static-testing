/**
 * @file The story of the Swatch Grid with option values.
 */

import { createTemplate } from '~/helpers/storybook'

import SwatchGrid from '~/components/SwatchGrid'

export default {
  title: 'Components/Swatch Grid',
  component: SwatchGrid
}

/**
 * Exports the base story.
 * @returns {object} - The base story.
 */
export const Base = createTemplate(SwatchGrid, {
  values: ['Red', 'Blue', 'Green']
})
