
module.exports = {
  layout: 'Content',
  title: '优惠券模板',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share: 'user',
        fields: [
          { field: 'name', label: '名称', type: 'input' },
          {
            field: 'type',
            label: '类型',
            type: 'select',
            options: [
              { label: '满减劵', value: '1' },
              { label: '折扣劵', value: '2' },
              { label: '代金券', value: '3' }
            ]
          }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'user',
        API: {
          listAPI: '/api/adm/users',
          deleteAPI: '/api/adm/users/(id)'
        },
        actions: [
          {
            title: '添加模板',
            type: 'path',
            options: {
              path: '/marketing/couponTemplateAdd'
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称' },
          {
            field: 'type',
            label: '类型',
            valueType: 'status',
            options: {
              statusMap: {
                1: '满减劵',
                2: '折扣劵',
                3: '代金券'
              }
            }
          },
          { field: 'enabled', label: '是否启用' },
          { field: 'effectTime', label: '有效天数' },
          { field: 'money', label: '金额' },
          { field: 'discount', label: '折扣' }
        ],
        operation: [
          {
            title: '删除', action: 'delete'
          }
        ]
      }
    }
  ]
}
