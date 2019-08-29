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
            listAPI: '/api/wms/procurements',
            deleteAPI:'/api/wms/procurements/(id)'
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
            { field: 'procurementCode',label: '采购单编号'},
            { field: 'supplierName',label: '供应商'},
            { field: 'procurementTotal',label: '总花费'},
            { field: 'procurementTime',label: '采购时间'},
            { field: 'procureStatus',label: '状态',valueType: 'showStatus',
              options: {
                  statusMap: {
                    'WaitForStorageIn':'等待入库',
                    'SectionStorageIn':'部分入库',
                    'TotalStorageIn':'全部入库',
                    'Draft':'草稿',
                    'Wait_To_Audit':'待审核',
                    'Audit_Passed':'审核通过',
                    'Closed':'已关闭',
                  },
                  colorMap: {
                    'WaitForStorageIn':'#777',
                    'SectionStorageIn':'#8BC34A',
                    'TotalStorageIn':'#009688',
                    'Draft':'#777',
                    'Wait_To_Audit':'#777',
                    'Audit_Passed':'rgb(33, 150, 243)',
                    'Closed':'#777',
                  }
              }
            },
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
              title: '入库',action:'path',
              options:{
                expectedField:[['procureStatus']],
                expectedValue:[['Audit_Passed','SectionStorageIn']],
                path:'/supply/purchaseOrderPut',
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '关闭',action:'request',
              options:{
                expectedField:[['procureStatus']],
                expectedValue:[['SectionStorageIn']],
                API:'/api/wms/procurements/(id)/closed',
                method:'put'
              }
            },
            {
              title: '编辑',action:'path',
              options:{
                expectedField:[['procureStatus']],
                expectedValue:[['Draft']],
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
              title: '删除',action: 'delete',
              options:{
                expectedField:[['procureStatus']],
                expectedValue:[['Draft',]],
              }
            }
          ],
        },
      },
    ]
  }
  