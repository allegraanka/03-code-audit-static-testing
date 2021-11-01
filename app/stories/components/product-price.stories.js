/**
 * @file Stories for the product price.
 */

import ProductPrice from '~/components/ProductPrice'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Product Price',
  component: ProductPrice
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(ProductPrice, {
  price: 100
})

/**
 * Shows the price on sale.
 */
export const CompareAt = createTemplate(ProductPrice, {
  price: 100,
  compareAt: 110
})

/**
 * Shows the price with RRP.
 */
export const WithRRP = createTemplate(ProductPrice, {
  price: 100,
  rrp: 200
})

/**
 * Shows the price with compare at + RRP.
 */
export const All = createTemplate(ProductPrice, {
  price: 100,
  compareAt: 110,
  rrp: 200
})

/**
 * Shows the price with compare at + RRP.
 */
export const Secondary = createTemplate(ProductPrice, {
  price: 100,
  compareAt: 110,
  rrp: 200,
  secondary: true
})

/**
 * Shows the price with compare at + RRP.
 */
export const Tertiary = createTemplate(ProductPrice, {
  price: 100,
  compareAt: 110,
  rrp: 200,
  tertiary: true
})
