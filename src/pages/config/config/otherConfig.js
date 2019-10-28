module.exports = {
  layout: 'Content',
  title: '其他配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path: '/subsysManage',
        API: {
          getAPI: '/api/crud/configmanagement/configs/otherConfig',
          createAPI: '/api/crud/configmanagement/configs/otherConfig'
        },
        fields: [
          { field: 'customer', label: '默认角色', type: 'input' },
          { field: 'apiUrl', label: 'API服务URL', type: 'input' },
          { field: 'customerRoleId', label: '快递100API查询公司编号', type: 'input' },
          { field: 'key', label: '快递100API查询Key', type: 'input' },
          { field: 'url', label: '关注我们文章地址', type: 'input' }
        ]
      }
    }
  ]

}
