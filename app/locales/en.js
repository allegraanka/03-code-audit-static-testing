/**
 * @file System strings in English.
 */

export default {
  general: {
    title: 'Pavers'
  },

  header: {
    account: {
      loggedIn: 'Account',
      loggedOut: 'Sign In / Register'
    },

    announcement: {
      goToPreviousSlide: 'Go to previous slide',
      goToNextSlide: 'Go to next slide'
    },

    search: {
      placeholder: 'Search for products',
      submit: 'Submit search query'
    },

    navigation: {
      megaNavToggle: 'Show mega-nav for "{title}"'
    }
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
      password: 'Password',
      address1: 'Address 1',
      address2: 'Address 2',
      city: 'City',
      country: 'Country',
      zip: 'Postal / Zip Code',
      phone: 'Phone'
    },
    errors: {
      required: 'Please complete all required fields.'
    }
  },

  drawer: {
    close: 'Close'
  },

  menu: {
    title: 'Menu'
  },

  pagination: {
    loading: 'Loading',
    loadMore: 'Load more'
  },

  quantitySelector: {
    decrease: 'Reduce quantity by 1',
    increase: 'Increase quantity by 1'
  },

  share: {
    title: 'Share',
    facebook: 'Share',
    twitter: 'Tweet',
    pinterest: 'Pin it'
  },

  cart: {
    title: 'My Basket',
    titleShort: 'Basket',
    empty: 'Your cart is currently empty.',
    link: 'Review & Checkout',
    totals: {
      subtotal: 'Subtotal'
    },
    disclaimer: 'Shipping, taxes, and discounts calculated at checkout.',
    close: 'Close & Continue Shopping',
    lineItem: {
      remove: 'Remove',
      size: 'Size',
      errors: {
        handleOrProduct: 'Please provide either a handle or product object.'
      }
    }
  },

  product: {
    notFound: 'Product not found',
    descriptionToggle: 'Read Product Description',
    unavailable: 'Unavailable',
    outOfStock: 'Out of stock',
    addToCart: 'Add to cart',
    selectOption: 'Select an option',
    selectVariant: 'Please select a variant',
    details: 'Product Details',
    back: 'Back to product page',
    openStockChecker: 'Check stock in store',
    preOrder: 'Pre-Order Now',
    estimatedDelivery: 'Estimated Delivery Date: {date}',
    lowInventory: 'Hurry, only {available} left!',
    openSizeGuide: 'Size Guide',
    color: 'Colour',
    description: 'Product Description',
    delivery: 'Delivery Rates & Info',
    returns: 'Returns',
    specifications: {
      gender: 'Gender',
      upper: 'Upper',
      lining: 'Lining',
      sole: 'Sole',
      width: 'Width',
      heelHeight: 'Heel Height'
    },
    gallery: {
      goToPrevious: 'Go to previous slide',
      goToNext: 'Go to next slide',
      goToSlide: 'Go to slide {position}',
      altFallback: '{title} image {index}'
    },
    price: {
      was: 'Was',
      rrp: 'RRP',
      now: 'Now'
    },
    sizeGuide: {
      title: 'Size Guide',
      shopSize: 'Shop Size',
      back: 'Back to product page',
      uk: 'UK',
      us: 'US',
      european: 'European',
      japanese: 'Japanese'
    },
    stockChecker: {
      title: 'In-Store Stock Checker',
      selectOption: 'Select {option}',
      postcode: 'Postcode',
      postcodePlaceholder: 'Enter your postcode',
      submit: 'Check',
      disclaimer:
        'Please note, we don’t currently offer stock reservations, but you can have have your order delivered to your nearest store for free. Select ‘Deliver to my local store’ at checkout.',
      empty: 'There are no results for {postcode}',
      back: 'Back to product page',
      available: 'In Stock',
      miles: '{miles} miles',
      directions: 'Get directions',
      error: "Something wen't wrong, please try again"
    },
    countdown: {
      hours: 'hrs',
      minutes: 'mins',
      seconds: 'secs'
    },
    addOn: {
      showContent: 'Show product add-on content',
      hideContent: 'Hide product add-on content'
    },
    swatches: {
      goToStart: 'Go to start',
      next: 'Next'
    }
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
    title: 'My Account',
    links: {
      logOut: 'Log out',
      dashboard: 'Account Overview',
      orders: 'Orders',
      addresses: 'Address Book'
    },
    notFound: {
      prefix: "We couldn't fetch your account details at this moment. Please",
      affix: 'try again'
    },
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
      additional: 'Additional addresses'
    },
    address: {
      notFound: "Address couldn't be found.",
      back: 'Back to Addresses',
      add: 'Add Address',
      edit: 'Edit Address',
      delete: 'Delete Address',
      update: 'Update Address',
      setAsDefault: 'Set as default address',
      errors: {
        addressDeleteById:
          'The address identifier must be provided to delete it.',
        addressDefaultById:
          'Address identifier is required to set the default address.'
      }
    }
  },

  sections: {
    heroBanner: {
      goToPrevious: 'Go to previous slide',
      goToNext: 'Go to next slide',
      goToSlide: 'Go to slide {position}'
    }
  }
}
