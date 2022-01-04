/**
 * @file Defines the schema for a page content type.
 */

import isUnique from '../../scripts/is-unique'

export default {
  title: 'Pages',
  name: 'page',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      description: 'Internal only'
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      description: 'A unique identifier for the page',
      validation: (rule) => rule.required(),
      options: {
        source: 'title',
        isUnique,
        maxLength: 200,
        slugify: (input) => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      }
    },
    {
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'accordionContent' },
        { type: 'blockContent' },
        { type: 'blogArticles' },
        { type: 'categoryBlocks' },
        { type: 'contactForm' },
        { type: 'contentBlocks' },
        { type: 'heroBanner' },
        { type: 'imageBanner' },
        { type: 'imageWithText' },
        { type: 'productCarousel' },
        { type: 'textBanner' }
      ]
    },
    {
      title: 'Sidebar Menu',
      name: 'menu',
      type: 'reference',
      to: [
        {
          type: 'menu'
        }
      ]
    },
    {
      title: 'Title and meta description',
      name: 'metadata',
      type: 'object',
      fields: [
        {
          title: 'Title',
          name: 'title',
          type: 'string'
        },
        {
          title: 'Description',
          name: 'description',
          type: 'text'
        }
      ]
    }
  ]
}
