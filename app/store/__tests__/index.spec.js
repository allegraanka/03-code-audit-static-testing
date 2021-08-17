/**
 * @file Tests for root store module
 */

import { state, actions, mutations } from '@/store'

const createMockContext = () => ({
  state: state(),
  commit: jest.fn(),
  dispatch: jest.fn()
})

describe('store/index', () => {
  let mockContext

  beforeEach(() => {
    mockContext = createMockContext()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('actions', () => {
    describe('nuxtServerInit', () => {
      it('dispatches navigation and setting actions', async () => {
        await actions.nuxtServerInit(mockContext)
        expect(mockContext.dispatch).toHaveBeenCalledWith('navigation/setLists')
        expect(mockContext.dispatch).toHaveBeenCalledWith(
          'settings/setSettings'
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
