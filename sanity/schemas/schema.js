/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Page from './documents/page'
import Settings from './documents/settings'

import HeroBanner from './objects/hero-banner'
import ContentSections from './objects/content-sections'
import ProductCarousel from './objects/product-carousel'

export default createSchema({
  types: schemaTypes.concat([

    /**
     * Documents.
     */
    Page,
    Settings,

    /**
     * Objects.
     */
    ContentSections,
    HeroBanner,
    ProductCarousel
  ])
})
