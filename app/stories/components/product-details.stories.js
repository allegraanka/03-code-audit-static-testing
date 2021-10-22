/**
 * @file Defines the stories for the product details drawer.
 */

import { createTemplate, parameterPresets } from '~/helpers/storybook'

import ProductDetails from '~/components/ProductDetails'

export default {
  title: 'Components/Product Details',
  component: ProductDetails,

  parameters: {
    ...parameterPresets.overlay
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(ProductDetails, {
  title: 'Product Details',
  namespace: 'product-details',
  content:
    "A fresh take on a summer sandal, these Gabor sandals are crafted with both comfort and style in mind. The duo of straps are wide for a supportive fit, whilst the slingback strap gives full foot support. The upper strap is secured with touch-fastening point that's hidden with an oversized tortoise shell faux-buckle, perfect for giving an adjustable fit and a trend-lead touch. The leather insock is cushioned for a relaxing fit and underfoot the exaggerated treads add stability.",
  highlights: [
    {
      content: 'Free Delivery to Store'
    },
    {
      content: '£2.99 Standard UK Delivery'
    },
    {
      content: '£6.99 DPD Express Next Day Tracked Delivery'
    }
  ],
  specifications: [
    {
      label: 'Gender',
      value: 'Female'
    },
    {
      label: 'Upper',
      value: 'Leather'
    },
    {
      label: 'Insole',
      value: 'Leather'
    }
  ],
  forceOpen: true
})
