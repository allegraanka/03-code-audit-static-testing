/**
 * @file Injects a Nacelle client into the Nuxt.js context.
 */

import Nacelle from '@nacelle/client-js-sdk'

export default ({ $config }, inject) => {
  inject('nacelle', new Nacelle({
    id: $config.NACELLE_SPACE,
    token: $config.NACELLE_TOKEN,
    nacelleEndpoint: 'https://hailfrequency.com/v3/graphql',
    useStatic: false
  }))
}
