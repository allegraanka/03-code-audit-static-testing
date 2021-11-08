/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Article from './documents/article'
import Blog from './documents/blog'
import Menu from './documents/menu'
import Page from './documents/page'
import SettingsCart from './documents/settings-cart'
import SettingsFooter from './documents/settings-footer'
import SettingsErrorPage from './documents/settings-errorPage'
import SettingsHeader from './documents/settings-header'
import SettingsProduct from './documents/settings-product'
import SettingsSeo from './documents/settings-seo'
import SettingsSocial from './documents/settings-social'

import AnnouncementItem from './objects/announcement-item'
import BlockContent from './objects/block-content'
import BlogArticles from './objects/blog-articles'
import Button from './objects/button'
import MenuItem from './objects/menu-item'
import SizeGuide from './objects/size-guide'

import CategoryBlocks from './objects/category-blocks'
import HeroBanner from './objects/hero-banner'
import ImageBanner from './objects/image-banner'
import ImageWithText from './objects/image-with-text'
import ProductCarousel from './objects/product-carousel'

export default createSchema({
  types: schemaTypes.concat([

    /**
     * Documents.
     */
    Article,
    Blog,
    Menu,
    Page,
    SettingsCart,
    SettingsErrorPage,
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
    CategoryBlocks,
    HeroBanner,
    ImageBanner,
    ImageWithText,
    MenuItem,
    ProductCarousel,
    SizeGuide
  ])
})
