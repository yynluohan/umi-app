module.exports = {
  layout: 'Content',
  title: '内部系统访问配置',
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
          { field: 'a', label: '用户名', type: 'input' },
          { field: 'b', label: '密码', type: 'input' },
          { field: 'c', label: '允许访问IP列表', type: 'input' },
        ],
      },
    }
  ]

}
