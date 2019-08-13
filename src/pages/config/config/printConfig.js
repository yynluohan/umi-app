module.exports = {
  layout: 'Content',
  title: '打印配置',
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
          { field: 'a', label: '订单打印LOGO', type: 'input' },
          { field: 'b', label: '订单打印标题', type: 'input' },
        ],
      },
    }
  ]

}
