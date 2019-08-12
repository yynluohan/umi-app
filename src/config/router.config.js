module.exports = [
  {
    name: '首页',
    icon: 'tag',
    path: '/'
  },
  {
    name: '产品管理',
    icon: 'tag',
    items: [
      {
        path: '/product/categroy',
        name: '产品类别',
        icon: 'tags',
      },
      {
        path: '/product',
        name: '产品',
        icon: 'tags',
      },
      {
        path: '/product/tag',
        name: '产品标签',
        icon: 'tags',
      },
      {
        path: '/product/trial',
        name: '试用装管理',
        icon: 'tags',
      },
      {
        path: '/product/evaluate',
        name: '评价管理',
        icon: 'tags',
      },
      {
        path: '/product/freight',
        name: '运费模板',
        icon: 'tags',
      },
      {
        path: '/product/brand',
        name: '品牌管理',
        icon: 'tags',
      }
    ]
  },
  {
    name: '订单管理',
    icon: 'tag',
    items:[
      {
        path: '/order/online',
        name: '线上订单',
        icon: 'tags',
      },
      {
        path: '/order/offline',
        name: '线下订单',
        icon: 'tags',
      },
      {
        path: '/order/refund',
        name: '退货处理',
        icon: 'tags',
      },
      {
        path: '/order/trialApplication',
        name: '试用装申请',
        icon: 'tags',
      },
      {
        path: '/order/setExpress',
        name: '快递设置',
        icon: 'tags',
      }
    ]
  },
  {
    path: '/store',
    name: '店铺管理',
    icon: 'tag',
  },
  {
    name: '供应链管理',
    icon: 'tag',
    items: [
      {
        path: '/supply/warehouse',
        name: '仓库管理',
        icon: 'tags',
      }
    ]
  },
  {
    name: '系统管理',
    icon: 'tag',
    items: [
      {
        path: '/sys/rule',
        name: '规则配置',
        icon: 'tags',
      }
    ]
  }
]
