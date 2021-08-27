/**
 * @file Tests for root store module
 */

import { state, actions, mutations } from '@/store'

/**
 * Test globals.
 */

const createMockContext = () => ({
  state: state(),
  commit: jest.fn(),
  dispatch: jest.fn()
})

let mockContext = null

describe('store/index', () => {
  /**
   * Setup tests.
   */
  beforeEach(() => {
    mockContext = createMockContext()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  /**
   * Run all tests.
   */
  describe('actions', () => {
    describe('nuxtServerInit', () => {
      it('dispatches server-side actions', async () => {
        await actions.nuxtServerInit(mockContext)

        expect(mockContext.dispatch).toHaveBeenCalledWith('navigation/setLists')
        expect(mockContext.dispatch).toHaveBeenCalledWith(
          'checkout/validateCheckout'
        )
      })
    })
  })

  describe('mutations', () => {
    describe('SET_WINDOW_OVERLAY_OPEN_STATE', () => {
      it('sets window overlay open state', () => {
        expect(mockContext.state.windowOverlay.open).toEqual(false)
        mutations.SET_WINDOW_OVERLAY_OPEN_STATE(mockContext.state, true)
        expect(mockContext.state.windowOverlay.open).toEqual(true)
      })
    })
  })
})
