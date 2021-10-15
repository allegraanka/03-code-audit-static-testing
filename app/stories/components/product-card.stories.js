/**
 * @file Defines stories for the product card component.
 */

import { decorators, createTemplate } from '~/helpers/storybook'

import ProductCard from '~/components/ProductCard'

export default {
  title: 'Components/Product Card',
  component: ProductCard,
  decorators: [decorators.card],

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the Base instance.
 * @returns {object} - The base instance.
 */
export const Base = createTemplate(ProductCard, {
  title: 'Lightweight Leather Clog',
  vendor: 'Pavers',
  price: 22,
  compareAt: 30,
  rrp: 50,
  thumbnailSrc:
    'https://cdn.shopify.com/s/files/1/1383/5259/products/874336.jpg?v=1617958289'
})
