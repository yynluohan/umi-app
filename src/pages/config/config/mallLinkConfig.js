module.exports = {
  layout: 'Content',
  title: '商城链接配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path: '/subsysManage',
        API: {
          getAPI: '/api/crud/configmanagement/configs/shopLinkConfig',
          createAPI: '/api/crud/configmanagement/configs/shopLinkConfig'
        },
        fields: [
          { field: 'home', label: '商城首页', type: 'input' },
          { field: 'productDetail', label: '产品详情页', type: 'input' },
          { field: 'myOrder', label: '我的订单页', type: 'input' },
          { field: 'orderDetail', label: '订单详情页', type: 'input' },
          { field: 'personalCenter', label: '个人中心页', type: 'input' },
          { field: 'storeList', label: '门店列表页', type: 'input' }
        ]
      }
    }
  ]

}
