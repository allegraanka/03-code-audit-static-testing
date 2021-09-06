/**
 * @file Fetches and injects settings from Nacelle.
 */

import { pascalCase } from '~/helpers/utils'

export default async ({ app }, inject) => {
  const content = {}
  const settings = ['navigation', 'seo']

  for (let index = 0; index < settings.length; index++) {
    await app.$nacelle
      .contentByHandle(
        `settings-${settings[index]}`,
        `settings${pascalCase(settings[index])}`
      )
      .then(({ fields }) => {
        content[settings[index]] = fields
      })
  }

  inject('settings', content)
}
