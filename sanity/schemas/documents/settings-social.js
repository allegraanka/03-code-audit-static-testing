/**
 * @file Defines the schema for handling social links.
 */

export default {
  title: 'Settings / Social',
  name: 'settingsSocial',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: true,
      initialValue: {
        current: 'settings-social'
      }
    },
    {
      title: 'Twitter',
      name: 'twitter',
      type: 'url'
    },
    {
      title: 'Facebook',
      name: 'facebook',
      type: 'url'
    },
    {
      title: 'Pinterest',
      name: 'pinterest',
      type: 'url'
    },
    {
      title: 'Instagram',
      name: 'instagram',
      type: 'url'
    }
  ]
}
