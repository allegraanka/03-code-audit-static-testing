/**
 * @file Defines tests for the quantity selector.
 */

import { shallowMount } from '@vue/test-utils'

import QuantitySelector from '@/scripts/components/QuantitySelector'

describe('Quantity selector component', () => {
  const elements = {
    wrapper: null,
    decrease: null,
    increase: null,
    input: null
  }

  beforeEach(() => {
    elements.wrapper = shallowMount(QuantitySelector)

    elements.decrease = elements.wrapper.findComponent({ ref: 'decrease' })
    elements.increase = elements.wrapper.findComponent({ ref: 'increase' })
    elements.input = elements.wrapper.findComponent({ ref: 'input' })
  })

  it('mounts', () => {
    expect(elements.wrapper).toBeDefined()
  })

  it('increases quantity on increase click event', async () => {
    await elements.increase.trigger('click')

    expect(Number(elements.input.element.value)).toBe(2)
  })

  it('decreases quantity on decrease click event', async () => {
    await elements.increase.trigger('click')
    await elements.decrease.trigger('click')

    expect(Number(elements.input.element.value)).toBe(1)
  })

  it("doesn't decrease more than the minimum", async () => {
    await elements.decrease.trigger('click')

    expect(Number(elements.input.element.value)).toBeGreaterThanOrEqual(1)
  })

  it("doesn't increase more than the maximum", async () => {
    if (elements.input.element.max) {
      for (let i = 0; i <= Number(elements.input.element.max) + 1; i++) {
        await elements.increase.trigger('click')
      }

      expect(Number(elements.input.element.value)).toBeLessThanOrEqual(
        Number(elements.input.element.max)
      )
    } else {
      expect(true)
    }
  })
})
