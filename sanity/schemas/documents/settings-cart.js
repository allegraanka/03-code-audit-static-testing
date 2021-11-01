/**
 * @file Defines the schema for cart settings.
 */

export default {
  title: 'Settings / Cart',
  name: 'settingsCart',
  type: 'document',
  fields: [
    {
      title: 'Handle',
      name: 'handle',
      type: 'slug',
      hidden: false,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-cart'
      }
    },
    {
      title: 'Express delivery countdown',
      name: 'expressDeliveryCountdown',
      type: 'object',
      fields: [
        {
          title: 'Enabled',
          name: 'enabled',
          type: 'boolean',
          initialValue: true
        },
        {
          title: 'Sunday through Friday cut-off',
          name: 'sundayThroughFriday',
          type: 'string',
          initialValue: '21:00'
        },
        {
          title: 'Saturday cut-off',
          name: 'saturday',
          type: 'string',
          initialValue: '18:30'
        },
        {
          title: 'Title',
          name: 'title',
          type: 'string',
          initialValue: 'Want Next Day Delivery?'
        },
        {
          title: 'Content',
          name: 'content',
          type: 'string',
          description: 'Add {date} to replace with the delivery date',
          initialValue: 'Order soon to receive your order on {date} when you select express delivery for £4.99!'
        }
      ]
    },
    {
      title: 'Free shipping threshold',
      name: 'freeShippingThreshold',
      type: 'object',
      fields: [
        {
          title: 'Threshold',
          name: 'threshold',
          type: 'number',
          initialValue: 0,
          description: 'Set to 0 to disable'
        }
      ]
    },
    {
      title: 'Highlights',
      name: 'highlights',
      type: 'array',
      of: [
        {
          type: 'blockContent'
        }
      ]
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          fields: [
            {
              title: 'Label',
              name: 'label',
              type: 'string'
            },
            {
              title: 'URL',
              name: 'url',
              type: 'url',
              validation: (rule) => rule.uri({
                allowRelative: true
              })
            }
          ]
        }
      ]
    }
  ]
}
