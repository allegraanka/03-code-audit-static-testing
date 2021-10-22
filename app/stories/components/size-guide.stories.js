/**
 * @file A group of size guides conditionally shown based on the product.
 */

import SizeGuide from '~/components/SizeGuide'

import { createTemplate, parameterPresets } from '~/helpers/storybook'

export default {
  title: 'Components/Size Guide',
  component: SizeGuide,

  parameters: {
    ...parameterPresets.overlay
  }
}

/**
 * Exports the base story.
 */
export const Base = createTemplate(SizeGuide, {
  content:
    'Shoes displayed on Pavers.co.uk are listed in British or European sizes. To convert them to your local sizes please use the chart below. These conversions are for guidance only and may vary by manufacturer.',
  guides: [
    {
      title: "Men's pants",
      sizes: [
        {
          uk: '1',
          european: '2',
          us: '3',
          japanese: '4',
          link: '/'
        },
        {
          uk: '5',
          european: '6',
          us: '7',
          japanese: '8',
          link: '/'
        },
        {
          uk: '1',
          european: '2',
          us: '3',
          japanese: '4',
          link: '/'
        },
        {
          uk: '5',
          european: '6',
          us: '7',
          japanese: '8',
          link: '/'
        }
      ]
    },
    {
      title: "Women's pants",
      sizes: [
        {
          uk: '1',
          european: '2',
          us: '3',
          japanese: '4',
          link: '/'
        },
        {
          uk: '5',
          european: '6',
          us: '7',
          japanese: '8',
          link: '/'
        },
        {
          uk: '1',
          european: '2',
          us: '3',
          japanese: '4',
          link: '/'
        },
        {
          uk: '5',
          european: '6',
          us: '7',
          japanese: '8',
          link: '/'
        }
      ]
    }
  ],
  forceOpen: true
})
