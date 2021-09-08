/**
 * @file A banner with a blog summary and article selection.
 */

export default {
  title: 'Blog articles',
  name: 'blogArticles',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Body',
      name: 'body',
      type: 'text'
    },
    {
      title: 'Call to action',
      name: 'callToAction',
      type: 'button'
    },
    {
      title: 'Articles',
      name: 'articles',
      type: 'array',
      validation: (rule) => rule.max(3),
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
    }
  ]
}
