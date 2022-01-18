/**
 * @file Defines stories for the catalogue carousel section.
 */

import { createTemplate } from '~/helpers/storybook'

import CatalogueCarousel from '~/sections/CatalogueCarousel'

export default {
  title: 'Sections/Catalogue Carousel',
  component: CatalogueCarousel,

  parameters: {
    layout: 'fullscreen'
  }
}

/**
 * Returns the base story.
 */
export const Base = createTemplate(CatalogueCarousel, {
  slides: [
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/d009c1e4d8a211ceb276a88c599a2f2d31f45126-420x538.jpg'
        }
      }
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/deda38f45fef52894ec2af0c7d6f4d979b56324a-420x538.jpg'
        }
      }
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/0a4909c79504795d4a34ac1f59b1ee8eec423e4d-420x538.jpg'
        }
      },
      products: ['chukka-lace-ankle-boot-chukka-28054']
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c4f75c6831234638575372c0b57062e161f2e9e9-420x538.jpg'
        }
      },
      products: [
        'pompei-summer-shoe-pompei-26309',
        'chukka-lace-ankle-boot-chukka-28054',
        'wedge-mule-vita25501-310-023',
        'antibacterial-mens-slippers-qing2202-305-624'
      ]
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/c4f75c6831234638575372c0b57062e161f2e9e9-420x538.jpg'
        }
      },
      products: [
        'open-toe-pump-with-flower-sand1900-135-753',
        'wide-fit-patent-leather-boots-capri34511-321-859'
      ]
    },
    {
      image: {
        asset: {
          url: 'https://cdn.sanity.io/images/sv3k3p3d/development/d5fc0605c5f0a13614c93052aecc966c6e3fcc75-420x538.jpg'
        }
      }
    }
  ],
  title: 'Shop the Catalogue'
})
