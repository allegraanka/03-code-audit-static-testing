/**
 * @file Tests for AppLogo component
 */

import { shallowMount } from '@vue/test-utils'
import AppLogo from '@/scripts/components/AppLogo'

describe('AppLogo component', () => {
  it('mounts', () => {
    const wrapper = shallowMount(AppLogo)
    expect(wrapper).toBeDefined()
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(AppLogo)
    expect(wrapper).toMatchSnapshot()
  })
})
