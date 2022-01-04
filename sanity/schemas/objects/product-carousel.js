export default {
  title: 'Product carousel',
  name: 'productCarousel',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string'
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          title: 'Product',
          name: 'product',
          type: 'string',
          description: 'The handle of the product'
        }
      ]
    }
  ]
}
