/**
 * @file Tests for Drawer component
 */

import { shallowMount } from '@vue/test-utils'

import Drawer from '@/scripts/components/Drawer'

/**
 * Test globals.
 */
const propsData = {
  namespace: 'example-drawer',
  forceOpen: true
}

const slots = {
  default: '<div class="slot-content"></div>'
}

const classes = {
  base: {
    container: 'drawer'
  },
  modifiers: {
    left: 'drawer--left'
  },
  state: {
    active: 'is-active'
  }
}

const selectors = {
  slotContent: '.slot-content'
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
  },
  $t: (string) => string
}

const elements = {
  wrapper: null
}

describe('Drawer component', () => {
  /**
   * Set up the tests.
   */
  beforeEach(() => {
    elements.wrapper = shallowMount(Drawer, { propsData, slots, mocks })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  /**
   * Run all tests on the component.
   */
  it('mounts', () => {
    expect(elements.wrapper).toBeDefined()
  })

  it('on mounted it registers drawer', () => {
    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/registerDrawer',
      'example-drawer'
    )
  })

  it('renders root element with `is-active` class if open', async () => {
    expect(elements.wrapper.classes().includes(classes.state.active)).toBe(true)
  })

  it('renders root element with `drawer--left` class if `leftAlign` prop is true', async () => {
    await elements.wrapper.setProps({ leftAlign: true })

    expect(elements.wrapper.classes().includes(classes.modifiers.left)).toBe(
      true
    )
  })

  it('has `tabindex` value of 0', async () => {
    expect(elements.wrapper.attributes().tabindex).toBe('0')
  })

  it('hides close button if `hideHeader` prop is true', async () => {
    await elements.wrapper.setProps({ hideHeader: true })

    expect(elements.wrapper.findComponent({ ref: 'header' }).exists()).toBe(
      false
    )
  })

  it('renders default slot content inside body', () => {
    const bodyWrapper = elements.wrapper.findComponent({ ref: 'body' })
    expect(bodyWrapper.find(selectors.slotContent).exists()).toBe(true)
  })

  it('on "esc" keyup it closes drawer', async () => {
    await elements.wrapper.trigger('keyup.esc')

    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/closeDrawer',
      propsData.namespace
    )
  })

  it('on close button click it closes drawer', async () => {
    await elements.wrapper.trigger('keyup.esc')

    expect(mocks.$store.dispatch).toHaveBeenCalledWith(
      'drawers/closeDrawer',
      propsData.namespace
    )
  })
})
