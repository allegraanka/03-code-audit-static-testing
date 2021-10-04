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
          title: 'Button link',
          name: 'buttonLink',
          type: 'url',
          initialValue: '/',
          validation: (rule) => rule.uri({
            allowRelative: true
          })
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
    }
  ]
}
