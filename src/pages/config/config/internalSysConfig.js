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
          getAPI:'/api/crud/configmanagement/configs/accessConfig',
          createAPI: '/api/crud/configmanagement/configs/accessConfig',
        },
        fields: [
          { field: 'username', label: '用户名', type: 'input' },
          { field: 'password', label: '密码', type: 'input' },
          { field: 'allowips', label: '允许访问IP列表', type: 'input' },
        ],
      },
    }
  ]

}
