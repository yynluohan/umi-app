export default {
  layout: 'Content',
  title: '门店管理',
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
          { field: 'code',label: '编号',type:'input'},
          { field: 'name',label: '店铺名',type:'input'}
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
          listAPI: '/api/store/stores',
          deleteAPI:'/api/store/stores/(id)'
        },
        actions:[
          {
            title: '添加',type:'path',
            options:{
              path: '/store/addStore'
            }
          }
        ],
        fields: [
          { field: 'code',label: '店铺编号',fixed: 'left',width:100},
          { field: 'name',label: '店铺名',width:200},
          { field: 'createTime',label: '创建时间',width:150},
          { field: 'type',label: '类型',valueType:'status',width:100,
            options: {
              statusMap: {
                'Store':'店铺',
                'Muaskin': '小屋'
              }
            }
          },
          { field: 'status',label: '状态',valueType:'showStatus',width:150,
            options: {
              statusMap: {
                'BUSINESS':'正在营业',
                'CLOSED':'已关闭',
                'REST':'休息中'
              },
              colorMap:{
                'BUSINESS': 'rgb(82, 196, 26)',
                'CLOSED':'rgb(245, 34, 45)',
                'REST':'rgb(16, 142, 233)'
              }
            }
          },
          { field: 'address',label: '地址',width:200},
          { field: 'telephone',label: '店铺联系电话',width:150},
          { field: 'assistantCount',label: '店铺规模',width:100},
          { field: 'warehouseName',label: '店铺仓库',width:150},
          // { field: 'assistantCount',label: '店铺规模'},
          { field:'operation',fixed: 'right'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/store/viewStore',
              queryData:(records) => {
                const data = {
                  id:records.id,
                  warehouseId: records.warehouseId,
                }
                return data
              }
            }
          },
          {
            title: '编辑',action:'path',
            options:{
              path:'/store/editStore',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '店铺休息',action:'request',
            options:{
              expectedField:[['status']],
              expectedValue:[['BUSINESS']],
              API:'/api/store/stores/(id)/action/rest',
              method:'post'
            }
          },
          {
            title: '关闭店铺',action:'request',
            options:{
              expectedField:[['status']],
              expectedValue:[['BUSINESS']],
              API:'/api/store/stores/(id)/action/closed',
              method:'post'
            }
          },
          {
            title: '正在营业',action:'request',
            options:{
              expectedField:[['status']],
              expectedValue:[['REST','CLOSED']],
              API:'/api/store/stores/(id)/action/business',
              method:'post'
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
