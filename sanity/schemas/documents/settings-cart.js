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
      hidden: true,
      validation: (rule) => rule.required(),
      initialValue: {
        current: 'settings-product'
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
        }
      ]
    },
    {
      title: 'Free shipping threshold',
      name: 'freeShippingThreshold',
      type: 'number',
      initialValue: 0,
      description: 'Set to 0 to disable'
    }
  ]
}
