module.exports = {
  layout: 'Content',
  title: '商品配置',
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
          { field: 'a', label: '分区1名称', type: 'input' },
          { field: 'b', label: '分区2名称', type: 'input' },
          { field: 'c', label: '分区3名称', type: 'input' },
          { field: 'd', label: '显示分成设置开关', type: 'input' },
          { field: 'e', label: '显示规格设置开关', type: 'input' },
        ],
      },
    }
  ]

}
