export default {
      layout: 'Content',
      title: '入库管理',
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
              { field: 'transactionCode',label: '入库单编号',type:'input'},
              { field: 'status',label: '草稿',type:'select',
                options: [
                  {label: '草稿',value: 'Draft'},
                  {label: '待审核',value: 'Wait_To_Audit'},
                  {label: '审核通过',value: 'Audit_Passed'},
                  {label: '完成',value: 'Done'},
                  {label: '关闭',value: 'Closed'}
                ]
              },
              { field: 'transactionType',label: '类型',type:'select',
                options: [
                  {label: '销售退货',value: 'SalesIn'},
                  {label: '调拨入库',value: 'TransferIn'},
                  {label: '采购入库',value: 'Procurement'},
                  {label: '分销商退货',value: 'CustomerStorageIn'},
                  {label: '其他入库',value: 'OthersStorageIn'}
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
              listAPI: '/api/wms/storages/in',
              deleteAPI:'/api/wms/storages/in/(id)'
            },
            actions:[
              {
                title: '添加',type:'path',
                options:{
                  path: '/supply/putStorageAdd'
                }
              }
            ],
            fields: [
              { field: 'transactionCode',label: '入库单编号'},
              { field: 'storageInTime',label: '入库时间'},
              { field: 'transactionType',label: '入库类型',valueType:'showStatus',
                options: {
                  statusMap: {
                    'SalesIn':'销售退货',
                    'TransferIn':'调拨入库',
                    'Procurement':'采购入库',
                    'CustomerStorageIn':'分销商退货' ,
                    'OthersStorageIn':'其他入库' 
                  },
                  colorMap: {
                    'SalesIn':'rgb(121, 72, 234)',
                    'TransferIn':'rgb(255, 87, 51)',
                    'Procurement':'rgb(42, 115, 6)',
                    'CustomerStorageIn':'#777' ,
                    'OthersStorageIn':'rgb(172, 51, 193)' 
                  }
                }
              },
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
                  path:'/supply/putStorageView',
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
                  expectedField:[['status']],
                  expectedValue:[['Wait_To_Audit']],
                  path: '/supply/putStorageApprove',
                  queryData:(records) => {
                    const data = {
                      id:records.id,
                    }
                    return data
                  }
                }
              },
              {
                title: '完成入库',action:'request',
                options:{
                  expectedField:[['status']],
                  expectedValue:[['Audit_Passed']],
                  API:'/api/wms/storages/in/(id)/execution',
                  method:'put'
                }
              },
              {
                title: '编辑',action:'path',
                options:{
                  expectedField:[['status']],
                  expectedValue:[['Draft']],
                  path:'/supply/putStorageEdit',
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
    