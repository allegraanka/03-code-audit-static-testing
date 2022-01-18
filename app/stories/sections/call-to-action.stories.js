/**
 * @file Defines stories for the image with text section.
 */

import { createTemplate } from '~/helpers/storybook'

import CallToAction from '~/sections/CallToAction'

export default {
  title: 'Sections/Call To Action',
  component: CallToAction,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(CallToAction, {
  title: 'AW 2021 Pavers Catalogue',
  button: {
    label: 'Find out more',
    link: '/',
    style: ''
  }
})
