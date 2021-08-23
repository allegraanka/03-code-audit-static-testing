/**
 * @file The story for the hero banner section.
 */

import { createTemplate } from '~/helpers/storybook'

import HeroBanner from '~/sections/HeroBanner'

export default {
  title: 'Sections/Hero Banner',
  component: HeroBanner
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(HeroBanner, {
  title: 'Hero banner title'
})
