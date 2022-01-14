/**
 * @file A full-width section for displaying an iFrame.
 */

import { createTemplate } from '~/helpers/storybook'

import EmbedBlock from '~/sections/EmbedBlock'

export default {
  title: 'Sections/Embed Block',
  component: EmbedBlock,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(EmbedBlock, {
  url: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik'
})

/**
 * Returns the contained version.
 */
export const Contained = createTemplate(EmbedBlock, {
  url: 'https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik',
  contain: true
})
