/**
 * @file An image section with no content.
 */

export default {
  title: 'Image banner',
  name: 'imageBanner',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      title: 'Link',
      name: 'link',
      type: 'url',
      validation: (rule) => rule.uri({
        allowRelative: true
      })
    }
  ]
}
