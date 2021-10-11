/**
 * @file Defines the stories for the Line Item component.
 */

import { createTemplate, decorators, products } from '~/helpers/storybook'

import LineItem from '~/components/LineItem'

export default {
  title: 'Components/Line Item',
  component: LineItem,
  decorators: [decorators.card]
}

/**
 * Creates the base line item story.
 * - Uses the default product handle.
 */
export const Base = createTemplate(LineItem, {
  item: products.supporting[0]
})
