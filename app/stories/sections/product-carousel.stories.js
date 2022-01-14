/**
 * @file A carousel of product cards with title and subtitle.
 */

import ProductCarousel from '~/sections/ProductCarousel'

export default {
  title: 'Sections/Product Carousel',
  component: ProductCarousel,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 * @returns {object} - The story component.
 */
export const Base = () => ({
  components: {
    ProductCarousel
  },

  data() {
    return {
      title: 'Best Sellers',
      subtitle: 'Shop Now',
      products: [
        'full-slipper-anat26000-311-253',
        'full-woolly-slipper-fevi28002-312-971',
        'slipper-clogs-muya34003-321-253',
        'faux-fur-lined-weather-boot-natu26000-311-204',
        'leopard-print-slippers-fevi32005-319-572',
        'wide-fit-ladies-full-slippers-qing32013-319-075',
        'melodie-slipper-clogs-melodie-320-619',
        'melodie-slipper-clogs-melodie-320-620',
        'shower-proof-padded-boots-acade34001-321-068'
      ]
    }
  },

  template: `
    <div style="margin: 3rem 0;">
      <product-carousel
        :title="title"
        :subtitle="subtitle"
        :products="products"
      />
    </div>
  `
})
