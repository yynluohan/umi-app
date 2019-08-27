export default {
    layout: 'Content',
    title: '库存调拨',
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
            { field: 'transactionCode',label: '调拨编号',type:'input'},
            { field: 'status',label: '状态',type:'select',
              options: [
                {title: '调拨中',value: 'Transfer'},
                {title: '草稿',value: 'Draft'},
                {title: '待审核',value: 'Wait_To_Audit'},
                {title: '审核通过',value: 'Audit_Passed'},
                {title: '完成',value: 'Done'},
                {title: '关闭',value: 'Closed'}
              ]
            },
            { field: 'fromWarehouseName',label: '调出仓库',type:'select-fetch',
              options: {
                  API:'/api/wms/warehouses',
                  label: 'warehouseName',
                  value: 'id',
                  dataField: 'records'
              }
            }
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
            listAPI: '/api/wms/transfers',
            deleteAPI:'/api/wms/transfers/(id)'
          },
          actions:[
            {
              title: '添加',type:'path',
              options:{
                path: '/supply/transferAdd'
              }
            }
          ],
          fields: [
            { field: 'transactionCode',label: '调拨编号'},
            { field: 'fromWarehouseName',label: '调出仓库'},
            { field: 'toWarehouseName',label: '调入仓库'},
            { field: 'transferTime',label: '调出时间'},
            { field: 'finishTime',label: '调入时间'},
            { field: 'status',label: '状态',valueType:'showStatus',
                options: {
                statusMap: {
                  'Draft':'草稿',
                  'Wait_To_Audit':'待审核',
                  'Audit_Passed':'审核通过',
                  'Done':'完成' ,
                  'Closed':'关闭' 
                },
                colorMap: {
                  'Draft':'rgb(172, 51, 193)',
                  'Wait_To_Audit':'rgb(245, 34, 45)',
                  'Audit_Passed':'#777',
                  'Done':'rgb(82, 196, 26)' ,
                  'Closed':'#777'  
                }
                }
            },
            { field: 'transactionBy',label: '经办人'},
            { field: 'operation'}
          ],
          operation: [
            {
              title:'查看',action:'path',
              options:{
                path:'/supply/transferView',
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
                expectedField:[['status']],
                expectedValue:[['Draft']],
                path:'/supply/transferEdit',
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
                expectedField:[['status']],
                expectedValue:[['Draft']],
              }
            }
          ],
        },
      },
    ]
  }
  