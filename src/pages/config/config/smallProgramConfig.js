module.exports = {
  layout: 'Content',
  title: '商城链接小程序页面配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path: '/subsysManage',
        API: {
          getAPI: '/api/crud/configmanagement/configs/shopLinkPageConfig',
          createAPI: '/api/crud/configmanagement/configs/shopLinkPageConfig'
        },
        fields: [
          { field: 'home', label: '商城首页', type: 'input' }
        ]
      }
    }
  ]

}
