export default {
  layout: 'Content',
  title: '仓库管理',
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
        share: 'categroy',
        fields: [
          { field: 'warehouseName', label: '仓库名称', type: 'input' }
        ]
      }
    },
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'categroy',
        scroll: { x: 1400 },
        API: {
          listAPI: '/api/wms/warehouses',
          deleteAPI: '/api/wms/warehouses/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/warehouseAdd'
            }
          }
        ],
        fields: [
          { field: 'warehouseCode', label: '仓库编号' },
          { field: 'warehouseName', label: '仓库名称' },
          { field: 'warehousePCD', label: '所在省市' },
          { field: 'warehouseAddress', label: '详细地址' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/supply/warehouseView',
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
              path: '/supply/warehouseEdit',
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
