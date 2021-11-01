/**
 * @file A group of image-based badges.
 */

import ProductBadges from '~/components/ProductBadges'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Product Badges',
  component: ProductBadges
}

export const Base = createTemplate(ProductBadges, {
  badges: [
    {
      alt: 'Clearance',
      src: 'https://cdn.secomapp.com/product_label/labels/pvstest/clearance.png'
    },
    {
      alt: 'Debbie Paver Loves',
      src: 'https://d4x7p4t7u5bpq.cloudfront.net/labels/pvstest/debbie-paver-loves-100x100px_65e13980-16ca-11ec-bd0d-d1a67bdbef09.png'
    }
  ]
})
