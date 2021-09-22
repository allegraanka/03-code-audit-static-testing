/**
 * @file Fetches and injects settings from Nacelle.
 */

import { pascalCase } from '~/helpers/utils'

export default async ({ app, beforeNuxtRender, nuxtState }, inject) => {
  const toInject = process.client ? nuxtState.settings : {}
  const modules = ['header', 'footer', 'social', 'seo', 'product']

  if (process.server) {
    for (let index = 0; index < modules.length; index++) {
      await app.$nacelle
        .contentByHandle(
          `settings-${modules[index]}`,
          `settings${pascalCase(modules[index])}`
        )
        .then(({ fields }) => {
          toInject[modules[index]] = fields
        })
    }

    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.settings = toInject
    })
  }

  inject('settings', toInject || {})
}
