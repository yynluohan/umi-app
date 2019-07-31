export default {
  layout: 'Content',
  title: '线下订单',
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
          { field: 'contactUser',label: '收货人',type:'input'},
          { field: 'phone',label: '联系电话',type:'input'},
          { field: 'startTime',label: '开始时间',type:'date'},
          { field: 'endTime',label: '结束时间',type:'date'},
          { field: 'status',label: '状态',type:'select',
            options: [
              {label: '待支付',value:'CREATED_PAY_PENDING'},
              {label: '支付超时关闭',value:'CLOSED_PAY_TIMEOUT'},
              {label: '已取消',value:'CLOSED_CANCELED'},
              {label: '已支付',value:'PAID_CONFIRM_PENDING'},
              {label: '待发货',value:'CONFIRMED_DELIVER_PENDING'},
              {label: '发货中',value:'DELIVERING'},
              {label: '已发货',value:'DELIVERED_CONFIRM_PENDING'},
              {label: '待退货',value:'CANCELED_RETURN_PENDING'},
              {label: '已确认收货',value:'CLOSED_CONFIRMED'},
              {label: '待退款',value:'CANCELED_REFUND_PENDING'},
              {label: '已退款',value:'CLOSED_REFUNDED'},
              {label: '待取货',value:'CONFIRMED_PICK_PENDING'},
            ]
          },
          { field: 'paymentType',label: '支付类型',type:'select',
            options: [
              {label: '微信支付',value:'WECHAT'},
              {label: '积分支付',value:'POINT'},
              {label: '线下支付',value:'STORE'},
              {label: '零钱钱包',value:'WALLET'},
              {label: '现金',value:'CASH'},
              {label: '支付宝',value:'ALIPAY'},
              {label: '银行卡',value:'CARD'},
            ]
          },
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
          { field: 'price',label: '价格'},
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

          { field: 'org',label: '结算店铺/收银员'},
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
