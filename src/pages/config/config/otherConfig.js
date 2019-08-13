module.exports = {
  layout: 'Content',
  title: '其他配置',
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
          { field: 'a', label: '默认角色', type: 'input' },
          { field: 'b', label: 'API服务URL', type: 'input' },
          { field: 'c', label: '快递100API查询公司编号', type: 'input' },
          { field: 'd', label: '快递100API查询Key', type: 'input' },
          { field: 'e', label: '关注我们文章地址', type: 'input' },
        ],
      },
    }
  ]

}
