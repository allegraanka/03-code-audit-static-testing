/**
 * @file Tests for Drawer component
 */

import { shallowMount } from '@vue/test-utils'

import Drawer from '@/scripts/components/Drawer'

const propsData = {
  namespace: 'example-drawer'
}

const slots = {
  default: `<div class="slot-content"></div>`
}

const mocks = {
  $store: {
    state: {
      drawers: {
        drawers: []
      }
    },
    getters: {
      'drawers/activeDrawer': 'example-drawer'
    },
    dispatch: jest.fn()
  }
}

describe('Drawer component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Drawer, { propsData, slots, mocks })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('mounts', () => {
    expect(wrapper).toBeDefined()
  })

  it('on mounted it registers drawer', () => {
    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/registerDrawer',
      'example-drawer'
    )
  })

  it('renders root element with "is-active" class if open', async () => {
    expect(wrapper.classes().includes('is-active')).toBe(true)
  })

  it('renders root element with "drawer--left" class if "leftAlign" prop is true', async () => {
    await wrapper.setProps({ leftAlign: true })
    expect(wrapper.classes().includes('drawer--left')).toBe(true)
  })

  it('has tabindex value 0', async () => {
    expect(wrapper.attributes().tabindex).toBe('0')
  })

  it('hides close button if "hideHeader" prop is true', async () => {
    await wrapper.setProps({ hideHeader: true })
    expect(wrapper.find('.drawer__header').exists()).toBe(false)
  })

  it('renders default slot content inside body', () => {
    const bodyWrapper = wrapper.find('.drawer__body')
    expect(bodyWrapper.find('.slot-content').exists()).toBe(true)
  })

  it('on "esc" keyup it closes drawer', async () => {
    await wrapper.trigger('keyup.esc')
    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/closeDrawer',
      propsData.namespace
    )
  })

  it('on close button click it closes drawer', async () => {
    await wrapper.trigger('keyup.esc')
    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/closeDrawer',
      propsData.namespace
    )
  })

  describe('when there is no activeDrawer', () => {
    beforeEach(() => {
      mocks.$store.getters['drawers/activeDrawer'] = undefined
      wrapper = shallowMount(Drawer, { propsData, mocks })
    })

    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('renders root element with just "drawer" class', () => {
      expect(wrapper.classes()).toEqual(['drawer'])
    })

    it('has tabindex value -1', () => {
      expect(wrapper.attributes().tabindex).toBe('-1')
    })

    it('drawer is active if "forceOpen" prop is true', async () => {
      expect(wrapper.vm.isActive).toBe(false)
      await wrapper.setProps({ forceOpen: true })
      expect(wrapper.vm.isActive).toBe(true)
    })
  })
})
