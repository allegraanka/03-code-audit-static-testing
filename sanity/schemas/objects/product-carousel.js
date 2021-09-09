export default {
  title: 'Product carousel',
  name: 'productCarousel',
  type: 'object',
  fields: [
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [
        {
          title: 'Product',
          name: 'product',
          type: 'nacelleData',
          options: {
            dataType: ['products']
          }
        }
      ]
    }
  ]
}
