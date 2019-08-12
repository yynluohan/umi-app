module.exports = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '产品管理',
    icon: 'tag',
    items: [
      {
        path: '/product/categroy',
        name: '产品类别',
        items: [
          { path: '/product/categroyAdd' },
          { path: '/product/categroyEdit' },
          { path: '/product/categroyView' }
        ]
      },
      {
        path: '/product',
        name: '产品',
        items: [
          { path: '/product/productAdd' },
          { path: '/product/productEdit' },
          { path: '/product/productView' }
        ]
      },
      {
        path: '/product/tag',
        name: '产品标签',
      },
      {
        path: '/product/trial',
        name: '试用装管理',
        items: [
          { path: '/product/trialAdd' },
          { path: '/product/trialEdit' },
          { path: '/product/trialView' }
        ]
      },
      {
        path: '/product/evaluate',
        name: '评价管理',
      },
      {
        path: '/product/freight',
        name: '运费模板',
        items: [
          { path: '/product/freightAdd' },
          { path: '/product/freightEdit' },
          { path: '/product/freightView' }
        ]
      },
      { path: '/product/brand', name: '品牌管理', }
    ]
  },
  {
    name: '订单管理',
    items:[
      {
        path: '/order/online',
        name: '线上订单',
        items: [
          { path: '/order/orderView' },
        ]
      },
      { path: '/order/offline', name: '线下订单', },
      { path: '/order/refund', name: '退货处理', },
      { path: '/order/trialApplication', name: '试用装申请', },
      { path: '/order/setExpress', name: '快递设置', }
    ]
  },
  {
    path:'/store',
    name: '店铺管理',
    items:[
      { path: '/store/addStore' },
      { path: '/store/editStore' },
      { path: '/store/viewStore' }
    ]
  },
  {
    name: '供应链管理',
    items: [
      { path: '/supply/warehouse' },
      { path: '/supply/warehouseAdd' },
      { path: '/supply/warehouseEdit' },
      { path: '/supply/warehouseView' }
    ]
  },
  {
    name: '系统管理',
    items: [
      { path: '/sys/rule' }
    ]
  }
]
