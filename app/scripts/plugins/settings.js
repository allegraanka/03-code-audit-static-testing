/**
 * @file Fetches and injects settings from Nacelle.
 */

import { pascalCase } from '~/helpers/utils'

export default async ({ app, beforeNuxtRender, nuxtState }, inject) => {
  const toInject = process.client ? nuxtState.settings : {}
  const modules = [
    'account',
    'header',
    'footer',
    'social',
    'seo',
    'product',
    'cart',
    'newsletter',
    'errorPage',
    'collection'
  ]

  if (process.server) {
    await Promise.all(
      modules.map((module) =>
        app.$nacelle.contentByHandle(
          `settings-${module}`,
          `settings${pascalCase(module)}`
        )
      )
    )
      .then((response) => {
        response.forEach(({ handle, fields }) => {
          const module = handle.replace('settings-', '')

          if (module) {
            toInject[module] = fields
          }
        })
      })
      .catch((errors) => {
        errors.forEach((error) => {
          console.error(error)
        })
      })

    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.settings = toInject
    })
  }

  inject('settings', toInject || {})
}
