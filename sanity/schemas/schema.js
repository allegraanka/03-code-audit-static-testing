/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Page from './documents/page'
import Settings from './documents/settings'

export default createSchema({
  types: schemaTypes.concat([
    Page,
    Settings
  ])
})
