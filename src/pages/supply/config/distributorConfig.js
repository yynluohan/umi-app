export default {
    layout: 'Content',
    title: '分销商列表',
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
            { field: 'traderName',label: '分销商名',type:'input'},
            { field: 'traderCode',label: '分销商编号',type:'input'},
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
            listAPI: '/api/warehouse/traders',
            deleteAPI:'/api/warehouse/traders/(id)'
          },
          actions:[
            {
              title: '添加',type:'path',
              options:{
                path: '/supply/distributorAdd'
              }
            }
          ],
          fields: [
            { field: 'traderName',label: '分销商名'},
            { field: 'traderCode',label: '分销商编号'},
            { field: 'traderPCD',label: '所在省市'},
            { field: 'traderAddress',label: '详细地址'},
            { field: 'traderPostcode',label: '邮政编码'},
            { field: 'traderContactName',label: '联系人'},
            { field: 'traderContactPhone',label: '联系人电话'},
            { field: 'traderStatus',label: '状态',valueType:'showStatus',
                options: {
                    statusMap: {
                    'Normal':'启用',
                    'Forbidden': '禁用'
                    },
                    colorMap: {
                    'Normal':'#03A9F4',
                    'Forbidden': '#777'
                    }
                }
            },
            { field: 'operation'}
          ],
          operation: [
            {
              title:'查看',action:'path',
              options:{
                path:'/supply/distributorView',
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
                path:'/supply/distributorEdit',
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
            }
          ],
        },
      },
    ]
  }
  