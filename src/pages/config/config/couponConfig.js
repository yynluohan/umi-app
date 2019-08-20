module.exports = {
  layout: 'Content',
  title: '优惠券配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path:'/subsysManage',
        API:{
          getAPI:'/api/crud/configmanagement/configs/couponConfig',
          createAPI: '/api/crud/configmanagement/configs/couponConfig',
        },
        fields: [
          { field: 'overdueTimeInterval', label: '快过期优惠券通知时间', type: 'input' },
        ],
      },
    }
  ]

}
