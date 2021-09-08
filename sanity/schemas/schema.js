/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Article from './documents/article'
import Blog from './documents/blog'
import Menu from './documents/menu'
import Page from './documents/page'
import SettingsFooter from './documents/settings-footer'
import SettingsHeader from './documents/settings-header'
import SettingsProduct from './documents/settings-product'
import SettingsSeo from './documents/settings-seo'
import SettingsSocial from './documents/settings-social'

import AnnouncementItem from './objects/announcement-item'
import BlockContent from './objects/block-content'
import BlogArticles from './objects/blog-articles'
import Button from './objects/button'
import MenuItem from './objects/menu-item'

import HeroBanner from './objects/hero-banner'
import ImageWithText from './objects/image-with-text'

export default createSchema({
  types: schemaTypes.concat([

    /**
     * Documents.
     */
    Article,
    Blog,
    Menu,
    Page,
    SettingsFooter,
    SettingsHeader,
    SettingsProduct,
    SettingsSeo,
    SettingsSocial,

    /**
     * Objects.
     */
    AnnouncementItem,
    BlockContent,
    BlogArticles,
    Button,
    HeroBanner,
    ImageWithText,
    MenuItem
  ])
})
