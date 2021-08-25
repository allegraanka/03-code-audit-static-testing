/**
 * @file Defines the stories for chevron icons.
 */

import { createSimpleTemplate } from '~/helpers/storybook'

import IconLeft from '@/assets/icons/directional-chevron-left.svg?inline'
import IconRight from '@/assets/icons/directional-chevron-right.svg?inline'
import IconUp from '@/assets/icons/directional-chevron-up.svg?inline'
import IconDown from '@/assets/icons/directional-chevron-down.svg?inline'

export default {
  title: 'Icons/Directional/Chevron'
}

export const Left = createSimpleTemplate(IconLeft)
export const Right = createSimpleTemplate(IconRight)
export const Up = createSimpleTemplate(IconUp)
export const Down = createSimpleTemplate(IconDown)
