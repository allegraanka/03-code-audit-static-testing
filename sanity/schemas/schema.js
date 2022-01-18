/**
 * @file Concatenates and exports schema to the Studio.
 */

import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import Article from './documents/article'
import Blog from './documents/blog'
import Menu from './documents/menu'
import Page from './documents/page'
import SettingsAccount from './documents/settings-account'
import SettingsCart from './documents/settings-cart'
import SettingsCollection from './documents/settings-collection'
import SettingsFooter from './documents/settings-footer'
import SettingsErrorPage from './documents/settings-errorPage'
import SettingsHeader from './documents/settings-header'
import SettingsProduct from './documents/settings-product'
import SettingsSeo from './documents/settings-seo'
import SettingsSocial from './documents/settings-social'
import SettingsNewsletter from './documents/settings-newsletter'

import AccordionContent from './objects/accordion-content'
import AnnouncementItem from './objects/announcement-item'
import BlockContent from './objects/block-content'
import BlogArticles from './objects/blog-articles'
import Button from './objects/button'
import MenuItem from './objects/menu-item'
import SizeGuide from './objects/size-guide'

import CallToAction from './objects/call-to-action'
import CatalogueCarousel from './objects/catalogue-carousel'
import CategoryBlocks from './objects/category-blocks'
import ContactFrom from './objects/contact-form'
import ContentBlocks from './objects/content-blocks'
import HeroBanner from './objects/hero-banner'
import EmbedBlock from './objects/embed-block'
import ImageBanner from './objects/image-banner'
import ImageWithText from './objects/image-with-text'
import ProductCarousel from './objects/product-carousel'
import SignUpForm from './objects/sign-up-form'
import TextBanner from './objects/text-banner'

export default createSchema({
  types: schemaTypes.concat([

    /**
     * Documents.
     */
    Article,
    Blog,
    Menu,
    Page,
    SettingsAccount,
    SettingsCart,
    SettingsCollection,
    SettingsErrorPage,
    SettingsFooter,
    SettingsHeader,
    SettingsProduct,
    SettingsSeo,
    SettingsSocial,
    SettingsNewsletter,

    /**
     * Objects.
     */
    AccordionContent,
    AnnouncementItem,
    BlockContent,
    BlogArticles,
    Button,
    CallToAction,
    CatalogueCarousel,
    CategoryBlocks,
    ContactFrom,
    ContentBlocks,
    HeroBanner,
    EmbedBlock,
    ImageBanner,
    ImageWithText,
    MenuItem,
    ProductCarousel,
    SignUpForm,
    TextBanner,
    SizeGuide
  ])
})
