export default {
  layout: 'Content',
  title: '出库管理',
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
          { field: 'outOrderNum', label: '入库单编号', type: 'input' },
          {
            field: 'status',
            label: '状态',
            type: 'select',
            options: [
              { label: '草稿', value: 'Draft' },
              { label: '待审核', value: 'Wait_To_Audit' },
              { label: '审核通过', value: 'Audit_Passed' },
              { label: '完成', value: 'Done' },
              { label: '关闭', value: 'Closed' }
            ]
          },
          {
            field: 'transactionType',
            label: '类型',
            type: 'select',
            options: [
              { label: '销售出库', value: 'SalesOut' },
              { label: '分销商出库', value: 'CustomerStorageOut' },
              { label: '采购退货', value: 'Refund' },
              { label: '调拨出库', value: 'TransferOut' },
              { label: '其他出库', value: 'OthersStorageOut' }
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
          listAPI: '/api/wms/storages/out',
          deleteAPI: '/api/wms/storages/out/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/supply/outStorageAdd'
            }
          }
        ],
        fields: [
          { field: 'outOrderNum', label: '出库单编号' },
          { field: 'storageOutTime', label: '出库时间' },
          {
            field: 'transactionType',
            label: '出库类型',
            valueType: 'showStatus',
            options: {
              statusMap: {
                SalesOut: '销售出库',
                CustomerStorageOut: '分销商出库',
                Refund: '采购退货',
                TransferOut: '调拨出库',
                OthersStorageOut: '其他出库'
              },
              colorMap: {
                SalesOut: 'rgb(121, 72, 234)',
                CustomerStorageOut: 'rgb(255, 87, 51)',
                Refund: 'rgb(42, 115, 6)',
                TransferOut: '#777',
                OthersStorageOut: 'rgb(172, 51, 193)'
              }
            }
          },
          { field: 'warehouseName', label: '仓库名称' },
          {
            field: 'status',
            label: '状态',
            valueType: 'showStatus',
            options: {
              statusMap: {
                Draft: '草稿',
                Wait_To_Audit: '待审核',
                Audit_Passed: '审核通过',
                Done: '完成',
                Closed: '关闭'
              },
              colorMap: {
                Draft: 'rgb(172, 51, 193)',
                Wait_To_Audit: 'rgb(245, 34, 45)',
                Audit_Passed: '#777',
                Done: 'rgb(82, 196, 26)',
                Closed: '#777'
              }
            }
          },
          { field: 'distributorCustomer', label: '客户' },
          { field: 'transactionBy', label: '经办人' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/supply/outStorageView',
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
            title: '审核',
            action: 'path',
            options: {
              expectedField: [['status']],
              expectedValue: [['Wait_To_Audit']],
              path: '/supply/outStorageApprove',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '完成出库',
            action: 'request',
            options: {
              expectedField: [['status']],
              expectedValue: [['Audit_Passed']],
              API: '/api/wms/storages/out/(id)/execution',
              method: 'put'
            }
          },
          {
            title: '编辑',
            action: 'path',
            options: {
              expectedField: [['status']],
              expectedValue: [['Draft']],
              path: '/supply/outStorageEdit',
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
              expectedField: [['status']],
              expectedValue: [['Draft']]
            }
          }
        ]
      }
    }
  ]
}
