/**
 * @file Test for accordion component
 */

import { shallowMount } from '@vue/test-utils'
import AccordionItem from '@/scripts/components/AccordionItem'
import Accordion from '@/scripts/components/Accordion'

const elements = {
  wrapper: null
}

const propsData = {
  id: 'test-id'
}

const parentComponent = {
  parentComponent: Accordion
}

const slots = {
  default: '<div class="default-slot"></div>'
}

describe('Accordion component', () => {
  /**
   * Set up the tests.
   */
  beforeEach(() => {
    elements.wrapper = shallowMount(AccordionItem, {
      slots,
      propsData,
      parentComponent
    })
  })

  /**
   * Run all tests on the component.
   */
  it('mounts', () => {
    expect(elements.wrapper).toBeDefined()
  })

  it('renders default slot content', () => {
    const accordionItem = elements.wrapper.find('.default-slot')
    expect(accordionItem.exists()).toBe(true)
  })

  it('Emits "accordion-control-click" event when clicked ', async () => {
    await elements.wrapper.find('button').trigger('click')
    await elements.wrapper.vm.$nextTick()
    expect(elements.wrapper.emitted()).toHaveProperty('accordion-control-click')
  })
})
