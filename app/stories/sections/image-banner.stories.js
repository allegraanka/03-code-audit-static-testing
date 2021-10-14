/**
 * @file Full-width image banner with optional container.
 */

import { createTemplate } from '~/helpers/storybook'

import ImageBanner from '~/sections/ImageBanner'

export default {
  title: 'Sections/Image Banner',
  component: ImageBanner,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(ImageBanner, {
  image: {
    asset: {
      url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c350f54c5240189c74b04095bbaeb025c48293d5-5041x3361.jpg'
    }
  },

  altText: 'Image banner example',
  link: '/collections/all'
})

/**
 * Returns the contained image story.
 */
export const Contain = createTemplate(ImageBanner, {
  image: {
    asset: {
      url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c350f54c5240189c74b04095bbaeb025c48293d5-5041x3361.jpg'
    }
  },

  altText: 'Image banner example',
  link: '/collections/all',
  contain: true
})
