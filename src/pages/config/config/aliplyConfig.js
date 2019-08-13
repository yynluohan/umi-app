module.exports = {
  layout: 'Content',
  title: '支付宝配置',
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
          { field: 'a', label: '应用ID', type: 'input' },
          { field: 'b', label: '应用密钥', type: 'input' },
          { field: 'c', label: '支付宝公钥', type: 'input' },
        ],
      },
    }
  ]

}
