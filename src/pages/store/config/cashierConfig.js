export default {
  layout: 'Content',
  title: '收银终端列表',
  items: [
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'categroy',
        API: {
          listAPI: '/api/store/cashiers',
          deleteAPI: '/api/store/cashiers/(id)'
        },
        fields: [
          { field: 'id', label: '终端 ID' },
          { field: 'code', label: '终端 UUID' },
          { field: 'model', label: '终端类型' },
          { field: 'createTime', label: '绑定时间' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/store/viewStore',
              // permission:'apply.view',
              // location:true
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '删除', action: 'delete'
          }
        ]
      }
    }
  ]
}
