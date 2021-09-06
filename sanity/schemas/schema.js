/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Article from './documents/article'
import Menu from './documents/menu'
import Page from './documents/page'
import SettingsNavigation from './documents/settings-navigation'
import SettingsSeo from './documents/settings-seo'

import AnnouncementItem from './objects/announcement-item'
import HeroBanner from './objects/hero-banner'
import MenuItem from './objects/menu-item'
import ProductCarousel from './objects/product-carousel'

export default createSchema({
  types: schemaTypes.concat([

    /**
     * Documents.
     */
    Article,
    Menu,
    Page,
    SettingsNavigation,
    SettingsSeo,

    /**
     * Objects.
     */
    AnnouncementItem,
    HeroBanner,
    MenuItem,
    ProductCarousel
  ])
})
