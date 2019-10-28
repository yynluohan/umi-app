export default {
  layout: 'Content',
  title: '分销订单列表',
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
          { field: 'salesCode', label: '订单编号', type: 'input' },
          {
            field: 'status',
            label: '状态',
            type: 'select',
            options: [
              { label: '待出库', value: 'WaitForStorageOut' },
              { label: '部分出库', value: 'SectionStorageOut' },
              { label: '全部出库', value: 'TotalStorageOut' },
              { label: '草稿', value: 'Draft' },
              { label: '待审核', value: 'Wait_To_Audit' },
              { label: '关闭', value: 'Closed' }
            ]
          }
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
          listAPI: '/api/warehouse/sales',
          deleteAPI: '/api/warehouse/sales/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/distributorOutAdd'
            }
          }
        ],
        fields: [
          { field: 'salesCode', label: '订单编号' },
          { field: 'traderName', label: '分销商' },
          { field: 'salesTotal', label: '订单总费用' },
          { field: 'totalCount', label: '订单总数量' },
          { field: 'transactionTime', label: '创建时间' },
          {
            field: 'salesStatus',
            label: '状态',
            valueType: 'showStatus',
            options: {
              statusMap: {
                WaitForStorageOut: '待出库',
                SectionStorageOut: '部分出库',
                TotalStorageOut: '全部出库',
                Draft: '草稿',
                Wait_To_Audit: '待审核',
                Closed: '关闭'
              },
              colorMap: {
                WaitForStorageOut: 'rgb(172, 51, 193)',
                SectionStorageOut: 'rgb(245, 34, 45)',
                TotalStorageOut: '#777',
                Draft: 'rgb(82, 196, 26)',
                Wait_To_Audit: '#777',
                Closed: '#777'
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
              path: '/supply/distributorOutView',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '审核',
            action: 'path',
            options: {
              expectedField: [['salesStatus']],
              expectedValue: [['Wait_To_Audit']],
              path: '/supply/distributorOutApprove',
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
              expectedField: [['salesStatus']],
              expectedValue: [['Draft']],
              path: '/supply/distributorOutEdit',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '删除',
            action: 'delete',
            options: {
              expectedField: [['salesStatus']],
              expectedValue: [['Draft']]
            }
          }
        ]
      }
    }
  ]
}
