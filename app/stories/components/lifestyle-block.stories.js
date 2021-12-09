/**
 * @file An image block with title, body and a call to action.
 */

import LifestyleBlock from '~/components/LifestyleBlock'

import { createTemplate, decorators } from '~/helpers/storybook'

export default {
  title: 'Components/Lifestyle Block',
  component: LifestyleBlock,
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [decorators.cardLarge]
}

/**
 * Exports the base story for the component.
 */
export const Base = createTemplate(LifestyleBlock, {
  title: 'Summer is here',
  body: "See what's new in our summer sandals range.",
  buttonLink: '/collections/all',
  imageSource:
    'https://blogstudio.s3.theshoppad.net/pvstest/6109b3a0ee639ea3ac5ef8a2ce776848.jpg'
})
