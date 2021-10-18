/**
 * @file Defines stories for the image with text section.
 */

import { createTemplate } from '~/helpers/storybook'

import ImageWithText from '~/sections/ImageWithText'

export default {
  title: 'Sections/Image With Text',
  component: ImageWithText,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(ImageWithText, {
  title: 'Promo Banner Header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pharetra, nulla in feugiat aliquet ipsum. Hac eget cursus vel ipsum.',
  callToAction: {
    label: 'Find out more',
    link: '/',
    style: ''
  },
  image: {
    asset: {
      url: 'https://cdn.sanity.io/images/sv3k3p3d/development/b8ab73570c74dd370582a403acc1a102c421ae52-5312x1708.jpg'
    }
  },
  altText: 'Promo Banner Header',
  imageLink: '/',
  styles: {
    backgroundColor: '',
    textColor: '',
    textAlignment: 'center'
  }
})
