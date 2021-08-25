/**
 * @file Defines the stories for caret icons.
 */

import { createSimpleTemplate } from '~/helpers/storybook'

import IconLeft from '@/assets/icons/directional-caret-left.svg?inline'
import IconRight from '@/assets/icons/directional-caret-right.svg?inline'
import IconUp from '@/assets/icons/directional-caret-up.svg?inline'
import IconDown from '@/assets/icons/directional-caret-down.svg?inline'

export default {
  title: 'Icons/Directional/Caret'
}

export const Left = createSimpleTemplate(IconLeft)
export const Right = createSimpleTemplate(IconRight)
export const Up = createSimpleTemplate(IconUp)
export const Down = createSimpleTemplate(IconDown)
