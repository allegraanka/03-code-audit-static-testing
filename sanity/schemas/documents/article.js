/**
 * @file Defines the schema for a article content type.
 */

import isUnique from '../../scripts/is-unique'

export default {
  title: 'Articles',
  name: 'article',
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
      title: 'Date',
      name: 'date',
      type: 'date',
      description: 'Displays as the published date on the front-end',
      validation: (rule) => rule.required()
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ]
    },
    {
      title: 'Summary',
      name: 'summary',
      type: 'text',
      description: 'Used as a summary for the article'
    },
    {
      title: 'Blog handle',
      name: 'blogHandle',
      type: 'string',
      validation: (rule) => rule.required()
    },
    {
      title: 'Related articles',
      name: 'relatedArticles',
      type: 'array',
      of: [
        {
          title: 'Article',
          name: 'article',
          type: 'reference',
          to: [
            {
              type: 'article'
            }
          ]
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
