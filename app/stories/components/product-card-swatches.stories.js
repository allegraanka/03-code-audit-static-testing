/**
 * @file A group of product swatches which emit click events.
 */

import ProductCardSwatches from '~/components/ProductCardSwatches'

import { createTemplate, decorators } from '~/helpers/storybook'

export default {
  title: 'Components/Product Card Swatches',
  component: ProductCardSwatches,
  decorators: [decorators.card],

  parameters: {
    layout: 'fullscreen'
  }
}

export const Base = createTemplate(ProductCardSwatches, {
  swatches: [
    {
      alt: 'Black',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/982711_ab104a12-f306-43bb-9f97-aeb3f9f7dec8.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Khaki',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/977972.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Green',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/940523.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Navy',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/977977.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Tan',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/982712.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Denim',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/940518.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Burgundy',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/979601.progressive.jpg?v=1632961692'
    },
    {
      alt: 'Red',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_b3847f8d-f21d-417d-bed4-cdd119d5de65.progressive.jpg?v=1633531900'
    }
  ]
})
