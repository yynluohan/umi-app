export default {
    layout: 'Content',
    title: '采购订单',
    items: [
      {
        span: 24,
        layout:'Empty',
        layoutConfig:{
          title: 'search',
          rightIcon:false,
          typeList:['General']
        },
        component: 'BaseSearch',
        config: {
          share:'categroy',
          fields: [
            { field: 'search',label: '编号/订单',type:'input',placeholder:'采购单编号/订单'},
            { field: 'procureStatus',label: '状态',type:'select',
              options: [
                  {label: '等待入库',value: 'xxx'},
                  {label: '部分入库',value: 'SectionStorageIn'},
                  {label: '全部入库',value: 'TotalStorageIn'},
                  {label: '草稿',value: 'Draft'},
                  {label: '待审核',value: 'Wait_To_Audit'},
                  {label: '审核通过',value: 'Audit_Passed'},
                  {label: '已关闭',value: 'Closed'},
              ]
            },
            { field: 'procurementTime',label: '开始时间',type:'date'},
            { field: 'procurementTime',label: '结束时间',type:'date'},
          ]
        }
      },
      {
        span: 24,
        layout:'Empty',
        component: 'BaseList',
        config: {
          share:'categroy',
          scroll:{ x:1400 },
          API: {
            listAPI: '/api/wms/refunds',
            deleteAPI:'/api/wms/refunds/(id)'
          },
          actions:[
            {
              title: '添加',type:'path',
              options:{
                path: '/supply/purchaseOrderAdd'
              }
            }
          ],
          fields: [
            { field: 'productRefundCode',label: '退货单编号'},
            { field: 'productRefundQuantities',label: '退货数量'},
            { field: 'productRefundTime',label: '退货时间'},
            { field: 'productRefundStatus',label: '退货状态',valueType: 'showStatus',
              options: {
                  statusMap: {
                    'Done':'完成',
                    'Draft':'草稿',
                    'Wait_To_Audit':'待审核',
                    'Audit_Passed':'审核通过',
                    'Closed':'关闭',
                  },
                  colorMap: {
                    'Done':'#777',
                    'Draft':'#8BC34A',
                    'Wait_To_Audit':'#009688',
                    'Audit_Passed':'#777',
                    'Closed':'#777',
                  }
              }
            },
            { field: 'originatorName',label: '经办人'},
            { field: 'transactionTime',label: '交易时间'},
            { field: 'operation'}
          ],
          operation: [
            {
              title:'查看',action:'path',
              options:{
                path:'/supply/purchaseOrderView',
                // permission:'apply.view',
                // location:true
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '编辑',action:'path',
              options:{
                path:'/supply/purchaseOrderEdit',
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '删除',action: 'delete'
            }
          ],
        },
      },
    ]
  }
  