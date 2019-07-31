export default {
  layout: 'Content',
  title: '退货处理',
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
        share:'product',
        fields: [
          { field: 'orderNumber',label: '订单号',type:'input'},
          { field: 'pName',label: '产品名称',type:'input'},
          { field: 'barCode',label: '条形码',type:'input'},
          { field: 'contactUser',label: '收货人',type:'input'},
          { field: 'phone',label: '联系电话',type:'input'},
        ]
      }
    },
    {
      span: 24,
      layout:'Empty',
      component: 'BaseList',
      config: {
        share:'product',
        // scroll:{x:2750},
        API: {
          listAPI: '/api/crud/subsys/subsyses',
          deleteAPI:'/api/crud/subsys/subsyses/(id)'
        },
        fields: [
          { field: 'cover',label: '封面'},
          { field: 'orderCode',label: '订单号'},
          { field: 'price',label: '总价'},
          { field: 'returnPrice',label: '退款金额'},
          { field: 'status',label: '状态',valueType:'status',
            options: {
              statusMap: {

              }
            }
          },
          { field: 'orderTime',label: '下单时间'},
          { field: 'payType',label: '支付类型',valueType:'status',
            options: {
              statusMap: {

              }
            }
          },
          { field: 'disType',label: '配送方式',valueType:'status',
            options: {
              statusMap: {

              }
            }
          },
          { field: 'org',label: '来源',valueType:'status',
            options: {
              statusMap: {

              }
            }
          },
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/subsysManage-view',
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
              path:'/subsysManage-edit',
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
