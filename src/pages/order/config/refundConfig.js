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
          listAPI: '/api/crud/order/orders?status=CLOSED_REFUNDED',
          deleteAPI:'/api/crud/order/orders/(id)'
        },
        fields: [
          { field: 'cover',label: '封面',valueType:'showImage'},
          { field: 'orderNumber',label: '订单号'},
          { field: 'totalPrice',label: '价格'},
          { field: 'refundFee',label: '退款金额'},
          { field: 'status',label: '状态',valueType:'showStatus',
            options: {
              statusMap: {
                'CREATED_PAY_PENDING':'待支付',
                'CLOSED_PAY_TIMEOUT':'支付超时关闭',
                'CLOSED_CANCELED':'已取消',
                'PAID_CONFIRM_PENDING':'已支付',
                'CONFIRMED_DELIVER_PENDING':'待发货',
                'DELIVERING':'发货中',
                'DELIVERED_CONFIRM_PENDING':'已发货',
                'CANCELED_RETURN_PENDING':'待退货',
                'CLOSED_CONFIRMED':'已确认收货',
                'CANCELED_REFUND_PENDING':'待退款',
                'CLOSED_REFUNDED':'已退款',
                'CONFIRMED_PICK_PENDING':'待取货'
              },
              colorMap: {
                'CREATED_PAY_PENDING':'#5bc0de',
                'CLOSED_PAY_TIMEOUT':'#777',
                'CLOSED_CANCELED':'#777',
                'PAID_CONFIRM_PENDING':'#777',
                'CONFIRMED_DELIVER_PENDING':'#5cb85c',
                'DELIVERING':'#777',
                'DELIVERED_CONFIRM_PENDING':'#428bca',
                'CANCELED_RETURN_PENDING':'#777',
                'CLOSED_CONFIRMED':'#f0ad4e',
                'CANCELED_REFUND_PENDING':'#777',
                'CLOSED_REFUNDED':'#777',
                'CONFIRMED_PICK_PENDING':'#777'
              }
            }
          },
          { field: 'payDate',label: '下单时间'},
          { field: 'paymentType',label: '支付类型',valueType:'status',
            options: {
              statusMap: {
                'WECHAT':'微信支付',
                'ALIPAY':'支付宝',
                'POINT':'积分支付',
                'STORE':'线下支付',
                'WALLET':'零钱钱包',
                'CASH': '现金',
                'CARD': '银行卡'
              }
            }
          },
          { field: 'deliveryType',label: '配送方式',valueType:'status',
            options: {
              statusMap: {
              'EXPRESS': '快递',
              'SELF_PICK': '自提',
              'FLASH': '极速送达'
              }
            }
          },
          { field: 'origin',label: '来源',valueType:'status',
            options: {
              statusMap: {
                'WPA':'微信公众号',
                'MINI_PROGRAM':'小程序',
                'APP_ANDROID':'手机应用程序',
                'APP_IOS': '手机应用程序',
                'IPAD': '手机应用程序',
                'OTHER': '其他'
              }
            }
          },
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/order/orderView',
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
            title: '删除',action: 'delete'
          }
        ],
      },
    },
  ]
}
