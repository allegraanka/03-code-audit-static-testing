/**
 * @file Showcases the product gallery for images.
 */

import ProductGallery from '~/components/ProductGallery'

export default {
  title: 'Components/Product Gallery',
  component: ProductGallery,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 * @returns {object} - The story.
 */
export const Base = () => ({
  components: {
    ProductGallery
  },

  data() {
    return {
      items: [
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDYxOTc1NDM0MDQzNw==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_f2005504-c00f-4606-bd8f-c30fe7ce1a7e.jpg?v=1626959780&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_f2005504-c00f-4606-bd8f-c30fe7ce1a7e.jpg?v=1626959780',
          type: 'image',
          altText: null
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4MzgwNzc2MDQ2OQ==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/963264.jpg?v=1616386293&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/963264.jpg?v=1616386293',
          type: 'image',
          altText: 'White'
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4OTY1NTQzOTQ0NQ==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_dd4db7e1-91aa-44c4-a175-f1dd45bdcc9e.jpg?v=1616476475&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_dd4db7e1-91aa-44c4-a175-f1dd45bdcc9e.jpg?v=1616476475',
          type: 'image',
          altText: null
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4OTY1NTQ3MjIxMw==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_b8923b7d-8d7a-4574-98c9-ce7fa12b88bf.jpg?v=1616476478&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_b8923b7d-8d7a-4574-98c9-ce7fa12b88bf.jpg?v=1616476478',
          type: 'image',
          altText: null
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4OTY1NTYzNjA1Mw==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_59c29869-234f-4f55-9a72-9bf0132aa776.jpg?v=1616476481&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_59c29869-234f-4f55-9a72-9bf0132aa776.jpg?v=1616476481',
          type: 'image',
          altText: null
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4OTY1NTY2ODgyMQ==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_8d82afd5-ae0d-44f3-9489-0f81d0472bb8.jpg?v=1616476484&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_8d82afd5-ae0d-44f3-9489-0f81d0472bb8.jpg?v=1616476484',
          type: 'image',
          altText: null
        },
        {
          id: 'Z2lkOi8vc2hvcGlmeS9JbWFnZVNvdXJjZS8yMDI4OTY1NjE2MDM0MQ==',
          thumbnailSrc:
            'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_9befc488-9188-4b23-b851-6f2c82c98f11.jpg?v=1616476489&width=100',
          src: 'https://cdn.shopify.com/s/files/1/1383/5259/products/1000_9befc488-9188-4b23-b851-6f2c82c98f11.jpg?v=1616476489',
          type: 'image',
          altText: null
        }
      ]
    }
  },

  template: `
    <div class="container" style="margin-top: 2rem;">
      <div class="row">
        <div class="col xs12 l6 push-l3">
          <product-gallery :items="items" />
        </div>
      </div>
    </div>
  `
})
