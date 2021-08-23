/**
 * @file The story for the product carousel section.
 */

import { createTemplate, products } from '~/helpers/storybook'

import ProductCarousel from '~/sections/ProductCarousel'

export default {
  title: 'Sections/Product Carousel',
  component: ProductCarousel
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(ProductCarousel, {
  products: [
    ...products.supporting.map((product) => ({
      current: product.handle
    }))
  ]
})
