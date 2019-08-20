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
          getAPI:'/api/crud/configmanagement/configs/goodsConfig',
          createAPI: '/api/crud/configmanagement/configs/goodsConfig',
        },
        fields: [
          { field: 'partnerLevelZone1', label: '分区1名称', type: 'input' },
          { field: 'partnerLevelZone2', label: '分区2名称', type: 'input' },
          { field: 'partnerLevelZone3', label: '分区3名称', type: 'input' },
          { field: 'showSettlementSetting', label: '显示分成设置开关', type: 'switch' },
          { field: 'showSpecificationSetting', label: '显示规格设置开关', type: 'switch' },
        ],
      },
    }
  ]

}
