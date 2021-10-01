/**
 * @file System strings in English.
 */

export default {
  header: {
    cart: 'Basket',
    account: {
      loggedIn: 'Account',
      loggedOut: 'Sign In / Register'
    },
    menu: 'Menu'
  },
  errors: {
    404: {
      message: {
        prefix: 'The page you are trying to view doesn’t exist. Try going',
        affix: 'back to the homepage'
      }
    },
    messages: {
      default: "Something wen't wrong, please try again."
    }
  },
  forms: {
    labels: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      password: 'Password'
    }
  },
  pagination: {
    loading: 'Loading',
    loadMore: 'Load more'
  },
  cart: {
    title: 'My Basket'
  },
  product: {
    notFound: 'Product not found'
  },
  page: {
    notFound: 'Page not found'
  },
  collection: {
    notFound: 'Collection not found'
  },
  blog: {
    notFound: 'Blog not found'
  },
  article: {
    notFound: 'Article not found'
  },
  account: {
    dashboard: {
      orders: {
        recent: 'Recent Order',
        viewAll: 'View All Orders',
        empty: "You haven't made any orders using this account.",
        link: 'Start shopping'
      },
      addresses: {
        title: 'Address Book',
        default: 'Default Address',
        viewAll: 'View All Addresses',
        empty: "You don't have any saved addresses.",
        link: 'Add a saved address'
      }
    },
    reset: {
      title: 'Reset Password',
      submit: 'Reset password',
      errors: {
        noUrlParam: 'The `url` parameter required to reset an account.'
      }
    },
    register: {
      title: 'Create Account',
      labels: {
        acceptsMarketing:
          'Sign up to latest news and offers and you could win £50 in our monthly prize draws'
      },
      submit: 'Register',
      errors: {
        invalid: 'Please complete all required fields.',
        exists: 'This email address is already associated with an account.'
      }
    },
    login: {
      title: 'Log in',
      errors: {
        invalid: 'Please complete all required fields.',
        fail: 'You couldn\'t be logged in, <nuxt-link to="/account/login">try again</nuxt-link>.'
      },
      submit: 'Login',
      recover: 'Forgotten your password?',
      register: {
        title: 'New Customers',
        body: 'Create an account to expedite future checkouts, view and update your account details, track your order status and history.',
        link: 'Create an account'
      }
    },
    recover: {
      title: 'Reset your password',
      link: 'Forgotten your password?',
      cancel: 'Cancel',
      submit: 'Submit',
      success: 'An email has been sent to {email}'
    },
    activate: {
      title: 'Activate Account',
      submit: 'Activate account',
      errors: {
        noUrlParam: 'The `url` parameter required to activate an account.'
      }
    },
    orders: {
      title: 'Your Orders',
      empty: "You haven't made any orders using this account.",
      viewOrder: 'View Order'
    },
    order: {
      notFound: "Order couldn't be found",
      back: 'Back to Orders',
      title: 'Order {number}',
      body: 'Thanks for your order! Check out the details below.',
      date: 'Order Date',
      details: 'Order Details',
      billing: 'Billing',
      shipping: 'Shipping',
      items: 'Order Items',
      sku: 'SKU',
      labels: {
        orderNumber: 'Order number',
        processedAt: 'Date',
        fulfillmentStatus: 'Shipping status',
        address: 'Shipping address',
        financialStatus: 'Payment status',
        total: 'Amount'
      },
      totals: {
        subtotal: 'Subtotal',
        shipping: 'Shipping (Standard Shipping)',
        tax: 'Tax (VAT 20.0%)',
        total: 'Total'
      }
    },
    addresses: {
      title: 'Your Addresses',
      add: 'Add new address',
      empty: "You don't have any saved addresses.",
      default: 'Default address',
      noDefault: "You don't have a default address.",
      additional: 'Additional addresses',
      errors: {
        addressDeleteById:
          'The address identifier must be provided to delete it.'
      }
    },
    address: {
      notFound: "Address couldn't be found.",
      back: 'Back to Addresses',
      add: 'Add Address',
      edit: 'Edit Address',
      delete: 'Delete Address'
    }
  }
}
