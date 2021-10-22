/**
 * @file A drawer with stock look up functionality.
 */

import StockChecker from '~/components/StockChecker'

import { createTemplate, parameterPresets } from '~/helpers/storybook'

export default {
  title: 'Components/Stock Checker',
  component: StockChecker,

  parameters: {
    ...parameterPresets.overlay
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(StockChecker, {
  productTitle: 'Example product',
  productVendor: 'Pavers',
  productThumbnail:
    'https://cdn.shopify.com/s/files/1/1383/5259/products/963264.jpg?v=1616386293',
  options: [
    {
      name: 'Colour',
      values: ['Red', 'Blue', 'Green']
    },
    {
      name: 'Size',
      values: ['1', '2', '3', '4', '5']
    }
  ],
  forceOpen: true
})
