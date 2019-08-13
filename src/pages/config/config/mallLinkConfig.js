module.exports = {
  layout: 'Content',
  title: '商城链接配置',
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
          { field: 'a', label: '商城首页', type: 'input' },
          { field: 'b', label: '产品详情页', type: 'input' },
          { field: 'c', label: '我的订单页', type: 'input' },
          { field: 'd', label: '订单详情页', type: 'input' },
          { field: 'e', label: '个人中心页', type: 'input' },
          { field: 'f', label: '门店列表页', type: 'input' },
        ],
      },
    }
  ]

}
