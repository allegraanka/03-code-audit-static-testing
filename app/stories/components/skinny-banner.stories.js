/**
 * @file A short, full-width banner with an image and content.
 */

import SkinnyBanner from '~/components/SkinnyBanner'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Skinny Banner',
  component: SkinnyBanner,
  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(SkinnyBanner, {
  title: 'Get set for summer with 10% off our Gardening collection',
  subtitle: 'Limited time only. while stocks last.',
  buttonLabel: 'Shop Now',
  buttonLink: '/collections/all',
  imageSource:
    'https://cdn.sanity.io/images/sv3k3p3d/development/c214b089b9ccc77537851febbaeb0a5fde20c99a-2656x192.png'
})
