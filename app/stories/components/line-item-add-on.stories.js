/**
 * @file Displays the add-on product for a line item.
 */

import LineItemAddOn from '~/components/LineItemAddOn'

import { createTemplate, decorators } from '~/helpers/storybook'

export default {
  title: 'Components/Line Item Add On',
  component: LineItemAddOn,
  decorators: [decorators.line],

  parameters: {
    layout: 'fullscreen'
  }
}

export const Base = createTemplate(LineItemAddOn, {
  thumbnailSrc:
    'https://cdn.shopify.com/s/files/1/1383/5259/products/IMBOX_logo_vertical_RGB_POS.jpg?v=1582300057',
  title: 'Imbox Shoe Care Protection',
  handle: 'imbox-treatment',
  price: 3.99
})
