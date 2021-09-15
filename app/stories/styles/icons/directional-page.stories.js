/**
 * @file Defines the stories for page icons.
 */

import { createSimpleTemplate } from '~/helpers/storybook'

import IconPageFirst from '@/assets/icons/directional-page-first.svg?inline'
import IconPageLast from '@/assets/icons/directional-page-last.svg?inline'

export default {
  title: 'Styles/Icons/Directional/Page'
}

export const First = createSimpleTemplate(IconPageFirst)
export const Last = createSimpleTemplate(IconPageLast)
