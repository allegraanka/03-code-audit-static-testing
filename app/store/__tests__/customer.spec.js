/**
 * @file Tests for customer store module
 */

import { state, actions, mutations } from '@/store/customer'

/**
 * Test globals.
 */

const createMockContext = () => ({
  state: state(),
  commit: jest.fn(),
  dispatch: jest.fn()
})

let mockContext = null

const accessTokenMock = '123abc'

describe('store/module', () => {
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
    describe('validateCustomer', () => {
      it('commits logout mutation if there is no customer cookie', () => {
        actions.$cookies = {
          get: () => null
        }
        actions.validateCustomer(mockContext)
        expect(mockContext.commit).toHaveBeenCalledWith('SET_LOGGED_OUT')
      })

      it('commits logout mutation if there is an expired customer cookie', () => {
        actions.$cookies = {
          get: () => ({
            expiresAt: '2019-11-26'
          })
        }
        actions.validateCustomer(mockContext)
        expect(mockContext.commit).toHaveBeenCalledWith('SET_LOGGED_OUT')
      })

      it('does nothing if there is a customer cookie without access token', () => {
        actions.$cookies = {
          get: () => ({
            expiresAt: '2021-11-26'
          })
        }
        actions.validateCustomer(mockContext)
        expect(mockContext.commit).not.toHaveBeenCalled()
      })

      it('commits login mutation if there is a customer cookie with access token', () => {
        actions.$cookies = {
          get: () => ({
            accessToken: accessTokenMock,
            expiresAt: '2021-11-26'
          })
        }
        actions.validateCustomer(mockContext)
        expect(mockContext.commit).toHaveBeenCalledWith(
          'SET_LOGGED_IN',
          accessTokenMock
        )
      })
    })

    describe('login', () => {
      it('throws an error if payload is missing a field', () => {
        try {
          actions.login(mockContext, { email: 'test@wemakewebsites.com' })
        } catch (e) {
          expect(e).toBeTruthy()
        }
      })

      it('returns rejected Promise if Shopify response contains errors', () => {
        const customerAccessTokenCreate = {
          customerUserErrors: ['error']
        }

        actions.$graphql = {
          shopify: {
            request: () => Promise.resolve({ customerAccessTokenCreate })
          }
        }

        return actions
          .login(mockContext, {
            email: 'test@wemakewebsites.com',
            password: '123456'
          })
          .catch((error) => {
            expect(error).toBeTruthy()
          })
      })

      it('dispatches setAccessToken action and returns Shopify response', () => {
        const customerAccessTokenCreate = {
          customerAccessToken: accessTokenMock
        }

        actions.$graphql = {
          shopify: {
            request: () => Promise.resolve({ customerAccessTokenCreate })
          }
        }

        return actions
          .login(mockContext, {
            email: 'test@wemakewebsites.com',
            password: '123456'
          })
          .then((response) => {
            expect(mockContext.dispatch).toHaveBeenCalledWith(
              'setAccessToken',
              accessTokenMock
            )
            expect(response).toEqual(customerAccessTokenCreate)
          })
      })
    })

    describe('setAccessToken', () => {
      beforeEach(() => {
        actions.$cookies = {
          set: jest.fn()
        }
      })

      it('sets cookie and commits login mutation if accessToken is passed', () => {
        actions.setAccessToken(mockContext, { accessToken: accessTokenMock })

        expect(actions.$cookies.set).toHaveBeenCalledWith(
          'customer',
          { accessToken: accessTokenMock },
          expect.any(Object)
        )

        expect(mockContext.commit).toHaveBeenCalledWith(
          'SET_LOGGED_IN',
          accessTokenMock
        )
      })

      it('throws an error if accessToken is not passed', () => {
        try {
          actions.setAccessToken(mockContext, {})
        } catch (e) {
          expect(e).toBeTruthy()
        }
      })
    })

    describe('logout', () => {
      beforeEach(() => {
        actions.$cookies = {
          get: jest.fn(),
          remove: jest.fn()
        }
        actions.$router = {
          currentRoute: { name: 'index' },
          push: jest.fn()
        }
        actions.$graphql = {
          shopify: {
            request: jest.fn()
          }
        }
      })

      it('commits logout mutation', async () => {
        await actions.logout(mockContext)
        expect(mockContext.commit).toHaveBeenCalledWith('SET_LOGGED_OUT')
        expect(actions.$router.push).not.toHaveBeenCalled()
        expect(actions.$cookies.remove).not.toHaveBeenCalled()
        expect(actions.$graphql.shopify.request).not.toHaveBeenCalled()
      })

      it('calls router push if current route is a secured path', async () => {
        actions.$router.currentRoute.name = 'account'
        await actions.logout(mockContext)
        expect(actions.$router.push).toHaveBeenCalled()
      })

      it('removes customer cookie if there is one', async () => {
        actions.$cookies.get = () => ({ accessToken: accessTokenMock })
        await actions.logout(mockContext)
        expect(actions.$cookies.remove).toHaveBeenCalledWith('customer')
      })

      it('triggers Shopify access token deletion request if there is a customer cookie', async () => {
        actions.$cookies.get = () => ({ accessToken: accessTokenMock })
        await actions.logout(mockContext)
        expect(actions.$graphql.shopify.request).toHaveBeenCalledWith(
          expect.any(Object),
          { customerAccessToken: accessTokenMock }
        )
      })
    })
  })

  describe('mutations', () => {
    describe('SET_LOGGED_IN', () => {
      it('sets loggedIn and accessToken state when logging in', () => {
        mutations.SET_LOGGED_IN(mockContext.state, accessTokenMock)
        expect(mockContext.state.loggedIn).toBe(true)
        expect(mockContext.state.accessToken).toBe(accessTokenMock)
      })
    })

    describe('SET_LOGGED_OUT', () => {
      it('sets loggedIn and accessToken state when logging out', () => {
        mockContext.state.accessToken = accessTokenMock
        mutations.SET_LOGGED_OUT(mockContext.state)
        expect(mockContext.state.loggedIn).toBe(false)
        expect(mockContext.state.accessToken).toBe(null)
      })
    })
  })
})
