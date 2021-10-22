/**
 * @file A list of highlighted benefits.
 */

import HighlightList from '~/components/HighlightList'

import { createTemplate } from '~/helpers/storybook'

export default {
  title: 'Components/Highlight List',
  component: HighlightList
}

export const Base = createTemplate(HighlightList, {
  items: [
    { content: 'Free Delivery to Store' },
    { content: '£2.99 Standard UK Delivery' },
    { content: '£6.99 DPD Express Next Day Tracked Delivery' }
  ]
})
