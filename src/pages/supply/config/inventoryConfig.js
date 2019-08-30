export default {
    layout: 'Content',
    title: '库存盘点',
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
            { field: 'checkCode',label: '盘点编号',type:'input'},
            { field: 'status',label: '状态',type:'select',
              options: [
                {label: '待盘点',value: 'WaitForCheck'},
                {label: '盘点中',value: 'Checking'},
                {label: '盘点结束',value: 'CheckOut'},
                {label: '草稿',value: 'Draft'},
                {label: '待审核',value: 'Wait_To_Audit'},
                {label: '完成', value:'Done'},
                {label: '关闭',value: 'Closed'}
              ]
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
            listAPI: '/api/wms/checks',
            deleteAPI:'/api/wms/checks/(id)'
          },
          actions:[
            {
              title: '添加',type:'path',
              options:{
                path: '/supply/inventoryAdd'
              }
            }
          ],
          fields: [
            { field: 'checkCode',label: '盘点编号'},
            { field: 'warehouseName',label: '盘点仓库'},
            { field: 'transactionBy',label: '经办人'},
            { field: 'checkTime',label: '盘点时间'},
            { field: 'originatorName',label: '制单人'},
            { field: 'status',label: '状态',valueType:'showStatus',
                options: {
                statusMap: {
                  'WaitForCheck':'待盘点',
                  'Checking':'盘点中',
                  'CheckOut':'盘点结束',
                  'Draft':'草稿',
                  'Wait_To_Audit':'待审核',
                  'Done':'完成' ,
                  'Closed':'关闭' 
                },
                colorMap: {
                  'WaitForCheck':'#777',
                  'Checking':'#777',
                  'CheckOut':'#777',
                  'Draft':'rgb(172, 51, 193)',
                  'Wait_To_Audit':'rgb(245, 34, 45)',
                  'Done':'rgb(82, 196, 26)' ,
                  'Closed':'#777'  
                }
                }
            },
            { field: 'operation'}
          ],
          operation: [
            {
              title:'查看',action:'path',
              options:{
                path:'/supply/inventoryView',
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
              title: '盘点',action:'path',
              options:{
                expectedField:[['status']],
                expectedValue:[['Draft']],
                path: '/supply/inventoryCheck',
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '继续盘点',action:'path',
              options:{
                expectedField:[['status']],
                expectedValue:[['Checking']],
                path: '/supply/inventoryCheckAgain',
                queryData:(records) => {
                  const data = {
                    id:records.id,
                  }
                  return data
                }
              }
            },
            {
              title: '完成盘点',action:'request',
              options:{
                expectedField:[['status']],
                expectedValue:[['Checking']],
                API:'/api/wms/checks/(id)/done',
                method:'post'
              }
            },
            {
              title: '编辑',action:'path',
              options:{
                expectedField:[['status']],
                expectedValue:[['Draft']],
                path:'/supply/inventoryEdit',
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
  