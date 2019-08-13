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
          getAPI:'/api/crud/subsys/subsyses/[id]',
          updateAPI: '/api/crud/subsys/subsyses/[id]',
        },
        fields: [
          { field: 'a', label: '最迟可退货时间', type: 'input' },
          { field: 'b', label: '自动确认收货期限', type: 'input' },
          { field: 'c', label: '支付超时时间', type: 'input' },
          { field: 'd', label: '新用户注册自动成为分销商开关', type: 'input' },
          { field: 'e', label: '产品售罄自动下架开关', type: 'input' },
          { field: 'f', label: '首页推荐产品轮询时间', type: 'input' },
          { field: 'g', label: '新建订单开关', type: 'input' },
          { field: 'h', label: '下单默认选中优惠券开关', type: 'input' },
          { field: 'i', label: '极速送达运费', type: 'input' },
          { field: 'j', label: '邀请二维码信息图片', type: 'input' },
          { field: 'k', label: '邀请二维码LOGO图片', type: 'input' },
          { field: 'l', label: '邀请二维码跳转链接', type: 'input' },
        ],
      },
    }
  ]

}
