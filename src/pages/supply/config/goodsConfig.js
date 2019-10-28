
module.exports = {
  layout: 'Content',
  title: '商品列表',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share: 'user',
        fields: [
          { field: 'skuName', label: '商品名称', type: 'input' },
          { field: 'barCode', label: '条形码', type: 'input' }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'user',
        API: {
          listAPI: '/api/wms/skus',
          deleteAPI: '/api/wms/skus/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/goodsAdd'
            }
          }
        ],
        fields: [
          { field: 'skuCode', label: '商品编号' },
          { field: 'skuName', label: '商品名称' },
          { field: 'barCode', label: '条形码' },
          { field: 'field1', label: '单位' },
          { field: 'createTime', label: '创建时间' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'path',
            options: {
              path: '/supply/goodsEdit',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/supply/goodsView',
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
