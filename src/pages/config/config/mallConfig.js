module.exports = {
  layout: 'Content',
  title: '商城配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path:'/subsysManage',
        API:{
          getAPI:'/api/crud/configmanagement/configs/shopConfig',
          createAPI: '/api/crud/configmanagement/configs/shopConfig',
        },
        fields: [
          { field: 'latestReturnTime', label: '最迟可退货时间', type: 'input' },
          { field: 'autoValidationReceivingDeadline', label: '自动确认收货期限', type: 'input' },
          { field: 'payOrderTimeout', label: '支付超时时间', type: 'input' },
          { field: 'sellerAutoSellership', label: '新用户注册自动成为分销商开关', type: 'switch' },
          { field: 'autoOffsell', label: '产品售罄自动下架开关', type: 'switch' },
          { field: 'promotedProductCarousel', label: '首页推荐产品轮询时间', type: 'input' },
          { field: 'orderCreatedEnable', label: '新建订单开关', type: 'switch' },
          { field: 'autoSelectCoupon', label: '下单默认选中优惠券开关', type: 'switch' },
          { field: 'flashFreight', label: '极速送达运费', type: 'input' },
          { field: 'infoUrl', label: '邀请二维码信息图片', type: 'input' },
          { field: 'logoUrl', label: '邀请二维码LOGO图片', type: 'input' },
          { field: 'redirectUrl', label: '邀请二维码跳转链接', type: 'input' },
        ],
      },
    }
  ]

}
