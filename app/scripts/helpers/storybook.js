/**
 * @file Defines helpers for Storybook stories.
 */

import { transform } from '~/helpers/utils'

/**
 * Creates a consistent template that can be used across sub-stories.
 * - Pass arguments to set prop defaults.
 *
 * @param {object} component - The component to use.
 * @param {object} args - The default arguments to pass.
 * @returns {Function} - The template function.
 */
export const createTemplate = (component, args) => {
  const { displayName } = component.__docgenInfo

  const template = (_args, { argTypes }) => ({
    components: {
      [displayName]: component
    },

    props: Object.keys(argTypes),

    template: `
      <${transform(component.__docgenInfo.displayName)} v-bind="$props" />
    `
  })

  template.args = {
    ...args
  }

  return template
}

/**
 * Creates a simple template.
 *
 * @param {object} component - The component to use.
 * @returns {Function} - The template function.
 */
export const createSimpleTemplate = (component) => {
  return () => ({
    components: {
      component
    },

    template: `
      <component />
    `
  })
}

/**
 * Exports an object of sample product data.
 */
export const products = {
  default: {
    handle: 'ana-full-coverage-slipper-ana-320-260',
    variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTQyOTY0Njc3ODQ1Mw=='
  },
  supporting: [
    {
      handle: '5-pack-cotton-rich-socks-for-men-ekin32017-319-440',
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMjkxNDMyODY0OTgxMw=='
    },
    {
      handle: 'adjustable-leather-mule-sandals-genc33011-320-991',
      variantId: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTQ1Njg4MzU3MjgyMQ=='
    }
  ]
}

/**
 * Consistent Vue methods to return product data.
 * - Injects the `product` data variable for use in a template.
 *
 * @returns {object} - The Vue methods.
 */
export const injectProduct = () => ({
  data() {
    return {
      product: null
    }
  },

  async fetch() {
    const product = await this.$root.context.$nacelle.productByHandle(
      products.default.handle
    )

    if (product) {
      this.product = product
    }
  }
})

/**
 * Exports an object of Decorators.
 * - Add as needed.
 */
export const decorators = {
  /**
   * A small, centered container for small components.
   * @returns {object} - The card Decorator options.
   */
  card() {
    return {
      template: `
        <div
          style="
            margin: 1rem auto;
            max-width: 400px;
          "
        >
          <story />
        </div>
      `
    }
  },

  /**
   * A medium, centered container for medium components.
   * @returns {object} - The card Decorator options.
   */
  cardLarge() {
    return {
      template: `
        <div
          style="
            margin: 1rem auto;
            max-width: 600px;
          "
        >
          <story />
        </div>
      `
    }
  },

  /**
   * A small, centered container for line-based components.
   * @returns {object} - The card Decorator options.
   */
  line() {
    return {
      template: `
        <div
          style="
            margin: 1rem auto;
            max-width: 600px;
          "
        >
          <story />
        </div>
      `
    }
  },

  /**
   * A large, centered container for line-based components.
   * @returns {object} - The card Decorator options.
   */
  lineLarge() {
    return {
      template: `
        <div
          style="
            margin: 1rem auto;
            max-width: 900px;
          "
        >
          <story />
        </div>
      `
    }
  },

  /**
   * A tiny, centered container for tiny elements.
   * @returns {object} - The tiny Decorator options.
   */
  tiny() {
    return {
      template: `
        <div
          style="
            margin: 1rem auto;
            max-width: 100px;
          "
        >
          <story />
        </div>
      `
    }
  }
}

/**
 * Exports an object of parameter presets.
 */
export const parameterPresets = {
  /**
   * Sets a background which mocks the window overlay.
   */
  overlay: {
    backgrounds: {
      default: 'base',
      values: [
        {
          name: 'base',
          value: 'rgba(0, 0, 0, 0.2)'
        }
      ]
    }
  }
}
