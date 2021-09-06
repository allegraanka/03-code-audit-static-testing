/**
 * @file A custom isUnique function for slugs.
 */

import client from 'part:@sanity/base/client'

export default (slug, { document }) => {
  const id = document._id.replace(/^drafts\./, '')

  const query = `
    !defined(*[!(_id in [$draft, $published]) && slug.current == $slug][0]._id)
  `

  const params = {
    draft: `drafts.${id}`,
    published: id,
    slug
  }

  return client.fetch(query, params)
}
