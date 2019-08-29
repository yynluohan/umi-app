export default {
    layout: 'Content',
    title: '采购退货',
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
                  {label: '草稿',value: 'Draft'},
                  {label: '待审核',value: 'Wait_To_Audit'},
                  {label: '审核通过',value: 'Audit_Passed'},
                  {label: '关闭',value: 'Closed'},
                  {label: '完成',value: 'Done'},
              ]
            },
            { field: 'productRefundTime',label: '开始时间',type:'date'},
            { field: 'productRefundTime',label: '结束时间',type:'date'},
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
                path: '/supply/purchaseReturnAdd'
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
                    'Done':'rgb(82, 196, 26)',
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
                path:'/supply/purchaseReturnView',
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
              title: '审核',action:'path',
              options:{
                expectedField:[['productRefundStatus']],
                expectedValue:[['Wait_To_Audit']],
                path: '/supply/wmsApprove',
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
                expectedField:[['productRefundStatus']],
                expectedValue:[['Draft']],
                path:'/supply/purchaseReturnEdit',
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '删除',action: 'delete',
              options:{
                expectedField:[['productRefundStatus']],
                expectedValue:[['Draft']],
              }
            }
          ],
        },
      },
    ]
  }
  