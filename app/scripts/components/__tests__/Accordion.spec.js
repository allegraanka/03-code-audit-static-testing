/**
 * @file Test for accordion component
 */

import { shallowMount } from '@vue/test-utils'
import Accordion from '@/scripts/components/Accordion'
import AccordionItem from '@/scripts/components/AccordionItem'

const elements = {
  wrapper: null
}

const slots = {
  default: '<div class="default-slot"></div>'
}

describe('Accordion component', () => {
  /**
   * Set up the tests.
   */
  beforeEach(() => {
    elements.wrapper = shallowMount(Accordion, { slots })
  })

  /**
   * Run all tests on the component.
   */
  it('mounts', () => {
    expect(elements.wrapper).toBeDefined()
  })

  it('renders element with `accordion--desktop-columns` class if `hasDesktopColumns` prop is true', async () => {
    await elements.wrapper.setProps({ hasDesktopColumns: true })

    expect(
      elements.wrapper.classes().includes('accordion--desktop-columns')
    ).toBe(true)
  })

  it('renders default slot content', () => {
    const accordionItem = elements.wrapper.find('.default-slot')
    expect(accordionItem.exists()).toBe(true)
  })
})
