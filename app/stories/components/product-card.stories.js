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
  handle: 'lightweight-leather-clog',
  vendor: 'Pavers',
  price: 22,
  compareAt: 30,
  rrp: 50,
  thumbnailSrc:
    'https://cdn.shopify.com/s/files/1/1383/5259/products/982711_ab104a12-f306-43bb-9f97-aeb3f9f7dec8.jpg?v=1632961692',
  badges: [
    {
      alt: 'Clearance',
      src: 'https://cdn.secomapp.com/product_label/labels/pvstest/clearance.png'
    }
  ],
  swatches: [
    {
      alt: 'Black',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/982711_ab104a12-f306-43bb-9f97-aeb3f9f7dec8.jpg?v=1632961692'
    },
    {
      alt: 'Khaki',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/977972.jpg?v=1632961692'
    },
    {
      alt: 'Green',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/940523.jpg?v=1632961692'
    },
    {
      alt: 'Navy',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/977977.jpg?v=1632961692'
    },
    {
      alt: 'Tan',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/982712.jpg?v=1632961692'
    },
    {
      alt: 'Denim',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/940518.jpg?v=1632961692'
    },
    {
      alt: 'Burgundy',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/979601.jpg?v=1632961692'
    },
    {
      alt: 'Red',
      src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_b3847f8d-f21d-417d-bed4-cdd119d5de65.jpg?v=1633531900'
    }
  ]
})
