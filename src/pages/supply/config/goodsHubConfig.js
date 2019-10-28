export default {
  layout: 'Content',
  title: '商品库存',
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
          {
            field: 'warehouseId',
            type: 'select-fetch',
            placeholder: '选择仓库',
            options: {
              API: '/api/wms/warehouses',
              label: 'warehouseName',
              value: 'id',
              dataField: 'records'
            }
          },
          { field: 'search', placeholder: '商品名称/编号/条码', type: 'input' }
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
          listAPI: '/api/wms/inventories',
          deleteAPI: '/api/wms/inventories/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/goodsHubAdd'
            }
          }
        ],
        fields: [
          { field: 'warehouseName', label: '仓库' },
          { field: 'skuName', label: '商品名称' },
          { field: 'skuBarcode', label: '商品条码' },
          { field: 'skuCode', label: '商品编号' },
          { field: 'validSku', label: '本库存总量' },
          { field: 'orderCount', label: '占用库存量' },
          { field: 'transmitQuantities', label: '在途数量' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/supply/goodsHubView',
              // permission:'apply.view',
              // location:true
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          }
          // {
          //   title: '编辑',action:'path',
          //   options:{
          //     expectedField:[['status']],
          //     expectedValue:[['Draft']],
          //     path:'/supply/goodsHubEdit',
          //     queryData:(records) => {
          //       const data = {
          //         id:records.id,
          //       }
          //       return data
          //     }
          //   }
          // },
          // {
          //   title: '删除',action: 'delete',
          //   options:{
          //     expectedField:[['status']],
          //     expectedValue:[['Draft']],
          //   }
          // }
        ]
      }
    }
  ]
}
