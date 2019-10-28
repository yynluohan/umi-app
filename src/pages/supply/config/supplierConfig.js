export default {
  layout: 'Content',
  title: '供应商列表',
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
          { field: 'supplierName', label: '供应商名', type: 'input' },
          { field: 'supplierCode', label: '供应商编号', type: 'input' }
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
          listAPI: '/api/wms/suppliers',
          deleteAPI: '/api/wms/suppliers/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/supplierAdd'
            }
          }
        ],
        fields: [
          { field: 'supplierName', label: '供应商名' },
          { field: 'supplierCode', label: '供应商编号' },
          { field: 'supplierPCD', label: '所在省市' },
          { field: 'supplierAddress', label: '详细地址' },
          { field: 'supplierPostcode', label: '邮政编码' },
          { field: 'supplierContactName', label: '联系人' },
          { field: 'supplierContactPhone', label: '联系人电话' },
          {
            field: 'supplierStatus',
            label: '状态',
            valueType: 'showStatus',
            options: {
              statusMap: {
                Normal: '启用',
                Forbidden: '禁用'
              },
              colorMap: {
                Normal: '#03A9F4',
                Forbidden: '#777'
              }
            }
          },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/supply/supplierView',
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
              path: '/supply/supplierEdit',
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
