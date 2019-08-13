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
          getAPI:'/api/crud/subsys/subsyses/[id]',
          updateAPI: '/api/crud/subsys/subsyses/[id]',
        },
        fields: [
          { field: 'a', label: '快过期优惠券通知时间', type: 'input' },
        ],
      },
    }
  ]

}
