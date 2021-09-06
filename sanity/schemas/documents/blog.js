/**
 * @file Defines the schema for a collection of articles.
 */

import isUnique from '../../scripts/is-unique'

export default {
  title: 'Blogs',
  name: 'blog',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
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
      title: 'Articles',
      name: 'articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'article'
            }
          ]
        }
      ]
    }
  ]
}
