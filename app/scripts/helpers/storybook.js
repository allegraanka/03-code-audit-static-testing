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
 * Exports an object of sample product data.
 */
export const products = {
  default: {
    handle: 'corsham-chelsea-boot-corsham-26268'
  },
  supporting: [
    {
      handle: '5-pack-cotton-rich-socks-for-men-ekin32017-319-440'
    },
    {
      handle: 'adjustable-leather-mule-sandals-genc33011-320-991'
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
  }
}
