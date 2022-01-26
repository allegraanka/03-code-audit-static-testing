/**
 * @file System strings in English.
 */

export default {
  general: {
    title: 'Pavers'
  },

  header: {
    account: {
      loggedIn: 'My Account',
      loggedOut: 'Sign In / Register',
      orders: 'Orders',
      addressBook: 'Address Book',
      logout: 'Log Out',
      toggle: 'Show account dropdown menu',
      wishlist: 'Wishlist'
    },

    announcement: {
      goToPreviousSlide: 'Go to previous slide',
      goToNextSlide: 'Go to next slide'
    },

    search: {
      placeholder: 'Search for products',
      submit: 'Submit search query',
      clear: 'Clear'
    },

    navigation: {
      megaNavToggle: 'Show mega-nav for "{title}"'
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
    close: 'Close Menu',
    back: 'Back to {title}',
    title: 'Menu'
  },

  newsletter: {
    signUp: 'Sign Up',
    placeholder: 'Enter your email address'
  },

  newsletterSignup: {
    title: 'Sign up to our newsletter',
    signUp: 'Sign Up',
    label: 'Email address',
    placeholder: 'Enter your email address',
    errors: {
      email: 'Please enter a valid email address',
      form: 'Sorry there was a problem signing you up'
    },
    defaults: {
      imageAltText: 'A woman sits reading a book wearing Pavers shoes',
      signUpMessage:
        'Subscribe to receive regular news and offers from Pavers. You can unsubscribe at any time.',
      successMessage: 'Thank-you for subscribing to Pavers newsletter.'
    },
    success: {
      title: 'Thanks for signing up!',
      button: 'Continue Shopping'
    }
  },

  menu: {
    title: 'Menu'
  },

  pagination: {
    loading: 'Loading',
    loadMore: 'View more',
    showingProducts: 'Showing {count} of {total} Products'
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
    checkout: 'Go to checkout',
    customerService: 'Customer Service',
    delivery: 'Delivery',
    deliveryDisclaimer: 'Shipping & taxes calculated at checkout',
    title: 'My Basket',
    titleShort: 'Basket',
    empty: 'Your cart is currently empty.',
    link: 'Review & Checkout',
    summaryTitle: 'Order Summary',
    totals: {
      subtotal: 'Subtotal',
      total: 'Total'
    },
    disclaimer: 'Shipping, taxes, and discounts calculated at checkout.',
    close: 'Close & Continue Shopping',
    continue: 'Continue Shopping',
    lineItem: {
      remove: 'Remove',
      size: 'Size',
      backOrder: 'Back Order:',
      estimatedDelivery: 'Estimated Delivery {date}',
      errors: {
        handleOrProduct: 'Please provide either a handle or product object.'
      }
    },
    freeShippingThreshold: {
      message: 'Spend {remaining} more to get free shipping',
      reached: "You've got free shipping"
    },
    addOn: {
      remove: 'Remove',
      link: 'Read More',
      price: '+{price}',
      modalToggle: 'Full Terms & Conditions'
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
      hideContent: 'Hide product add-on content',
      added: 'Will be added with this item'
    },
    swatches: {
      goToStart: 'Go to start',
      next: 'Next'
    },
    codes: {
      reference: 'Ref',
      order: 'Order Code'
    },
    stockNotification: {
      content:
        'This item is out of stock. Sign up below to receive a notification when it becomes available again.',
      emailPlaceholder: 'Enter your email address',
      emailRequired: 'Please enter your email address',
      submit: 'Submit'
    }
  },

  page: {
    notFound: 'Page not found'
  },

  collection: {
    notFound: 'Collection not found',
    expandDescription: 'Read More',
    collapseDescription: 'Read Less',
    productCount: '{count} Products',
    filterToggle: 'Filter By',
    removeRefinement: 'Remove the {label} refinement',
    filterTitle: 'Filter by',
    viewResults: 'View Results ({count})',
    backToFilters: 'Back to Filters',
    noFacetValues: '0 options for your selection',
    attributes: {
      optionsSize: 'Size'
    },
    sortOptions: {
      shopify_pavers_products: 'Featured',
      shopify_pavers_products_title_asc: 'Alphabetically, A-Z',
      shopify_pavers_products_title_desc: 'Alphabetically, Z-A',
      shopify_pavers_products_price_asc: 'Price, low to high',
      shopify_pavers_products_price_desc: 'Price, high to low'
    },
    lifestyleBlock: {
      button: 'Shop Now'
    }
  },

  search: {
    title: 'Results for',
    results: 'No results found for: “{query}”',
    noSearch: 'No search found'
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
      prompt: 'Already have an account?',
      back: 'Log in here',
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
        link: 'Register'
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
      back: 'Back to address book',
      add: 'Add Address',
      edit: 'Edit Address',
      delete: 'Delete Address',
      update: 'Update Address',
      default: 'This is your default address',
      setAsDefault: 'Set as default',
      errors: {
        addressDeleteById:
          'The address identifier must be provided to delete it.',
        addressDefaultById:
          'Address identifier is required to set the default address.'
      }
    }
  },

  sections: {
    categoryBlocks: {
      goToPreviousSlide: 'Go to previous slide',
      goToNextSlide: 'Go to next slide'
    },
    heroBanner: {
      goToPrevious: 'Go to previous slide',
      goToNext: 'Go to next slide',
      goToSlide: 'Go to slide {position}'
    },
    signUpForm: {
      submit: 'Sign up',
      placeholders: {
        firstName: 'First name',
        lastName: 'Last name',
        address1: 'Address',
        address2: 'Apartment, suite, etc. (optional)',
        city: 'City',
        country: 'Country',
        postcode: 'Postcode'
      }
    },
    catalogueCarousel: {
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out'
    },
    productCarousel: {
      goToPreviousSlide: 'Go to previous slide',
      goToNextSlide: 'Go to next slide'
    }
  },

  searchOverlay: {
    noSuggestions: '0 suggestions',
    noResults: '0 results',
    brands: 'Brands',
    viewAllResults: 'View All Results ({count})',
    suggestionsSubtitle: {
      withQuery: 'Keyword Results',
      withoutQuery: 'Popular Searches'
    },
    resultsSubtitle: {
      withQuery: 'Results',
      withoutQuery: 'Recommended Products'
    }
  }
}
