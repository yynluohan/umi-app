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
      },
      {
        path: '/sys/adGroup',
        name: '广告组',
        icon: 'tags'
      },
      {
        path: '/sys/advertising',
        name: '广告',
        icon: 'tags'
      },
      {
        path: '/sys/wechatTemplate',
        name: '微信模版消息设置',
        icon: 'tags'
      }
    ]
  },
  {
    name: '配置管理',
    icon: 'tag',
    items: [
      {
        name: '商城配置',
        path: '/config/mall',
        icon: 'tags'
      },
      {
        name: '微信配置',
        path: '/config/wechat',
        icon: 'tags'
      },
      {
        name: '支付宝配置',
        path: '/config/alipay',
        icon: 'tags'
      },
      {
        name: '商品配置',
        path: '/config/goods',
        icon: 'tags'
      },
      {
        name: '优惠券配置',
        path: '/config/coupon',
        icon: 'tags'
      },
      {
        name: '商城链接配置',
        path: '/config/mallLink',
        icon: 'tags'
      },
      {
        name: '商城链接小程序配置',
        path: '/config/smallProgram',
        icon: 'tags'
      },
      {
        name: '内部系统访问配置',
        path: '/config/internalSys',
        icon: 'tags'
      },
      {
        name: '打印配置',
        path: '/config/print',
        icon: 'tags'
      },
      {
        name: '其他配置',
        path: '/config/other',
        icon: 'tags'
      }
    ]
  }
]
