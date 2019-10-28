export default {
  layout: 'Content',
  title: '运费模板',
  items: [
    {
      span: 24,
      layout: 'Empty',
      layoutConfig: {
        title: 'search',
        rightIcon: false,
        typeList: ['General']
      },
      component: 'BaseSearch',
      config: {
        share: 'product',
        fields: [
          { field: 'name', label: '模板名称', type: 'input' }
        ]
      }
    },
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'product',
        // scroll:{x:2750},
        API: {
          listAPI: '/api/crud/product/fareTemplates',
          deleteAPI: '/api/crud/product/fareTemplates/(id)'
        },
        actions: [
          {
            title: '新增运费模板',
            type: 'path',
            options: {
              path: '/product/freightAdd'
            }
          }
        ],
        fields: [
          { field: 'name', label: '模板名称' },
          { field: 'lastModifiedDate', label: '最后编辑时间' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/product/freightView',
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
            title: '编辑',
            action: 'path',
            options: {
              path: '/product/freightEdit',
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
