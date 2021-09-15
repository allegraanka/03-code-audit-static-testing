/**
 * @file Defines the stories for arrow icons.
 */

import { createSimpleTemplate } from '~/helpers/storybook'

import IconBackward from '@/assets/icons/directional-arrow-backward.svg?inline'
import IconDownward from '@/assets/icons/directional-arrow-downward.svg?inline'
import IconForward from '@/assets/icons/directional-arrow-forward.svg?inline'
import IconUpward from '@/assets/icons/directional-arrow-upward.svg?inline'

export default {
  title: 'Styles/Icons/Directional/Arrow'
}

export const Backward = createSimpleTemplate(IconBackward)
export const Downward = createSimpleTemplate(IconDownward)
export const Forward = createSimpleTemplate(IconForward)
export const Upward = createSimpleTemplate(IconUpward)
