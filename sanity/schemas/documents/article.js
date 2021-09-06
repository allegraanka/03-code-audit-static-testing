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
      title: 'Blog',
      name: 'blog',
      type: 'reference',
      description: 'Assign the article to a blog',
      to: [
        {
          type: 'blog'
        }
      ]
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
