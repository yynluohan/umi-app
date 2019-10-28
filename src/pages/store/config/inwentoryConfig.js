export default {
  layout: 'Content',
  title: '库存管理',
  items: [
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'categroy',
        API: {
          listAPI: '/api/wms/inventories',
          deleteAPI: '/api/wms/inventories/(id)'
        },
        fields: [
          { field: 'skuBarcode', label: '商品条码' },
          { field: 'skuName', label: '商品名称' },
          { field: 'validSku', label: '商品库存' }
        ]
      }
    }
  ]
}
