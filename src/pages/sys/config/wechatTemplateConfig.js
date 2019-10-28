
module.exports = {
  layout: 'Content',
  title: '微信模版消息设置',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share: 'user',
        fields: [
          { field: 'name', label: '名称', type: 'input' }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'user',
        API: {
          listAPI: '/api/crud/wxTemplateMessage/wechatTemplateMessages',
          deleteAPI: '/api/crud/wxTemplateMessage/wechatTemplateMessages/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/sys/wechatTemplateAdd'
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称' },
          {
            field: 'type',
            label: '类型',
            valueType: 'status',
            options: {
              statusMap: {
                orderCreated: '成功下单通知',
                orderCefunded: '订单退款通知',
                orderCanceled: '取消订单通知',
                orderPayTimeout: '订单支付超时通知',
                orderDelivering: '订单发货通知',
                orderServiceCreated: '订单退款申请通知',
                rewardCashApplying: '提现申请提交成功通知',
                rewardCashHandling: '提现申请处理中通知',
                rewardCashRejected: '提现申请被拒绝通知',
                rewardCashCompleted: '成功提现通知',
                couponDispatched: '优惠券发送通知',
                couponOverdue: '优惠券即将到期通知',
                tempCrownApproved: '成为临时皇冠商通知',
                physicalSellerApproved: '成为星级经销商通知',
                tempCrownResetted: '临时皇冠商撤销通知'
              }
            }
          },
          { field: 'id', label: '模板id' },
          {
            field: 'enabled',
            label: '是否启用',
            valueType: 'showStatus',
            options: {
              statusMap: {
                0: '禁用',
                1: '启用'
              },
              colorMap: {
                1: '#428bca',
                0: '#777'
              }
            }
          },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/sys/wechatTemplateView',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '编辑',
            action: 'path',
            options: {
              path: '/sys/wechatTemplateEdit',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '禁用',
            action: 'request',
            options: {
              expectedField: [['enabled']],
              expectedValue: [[1]],
              API: '/api/crud/wxTemplateMessage/wechatTemplateMessages/(id)/disable',
              method: 'post'
            }
          },
          {
            title: '启用',
            action: 'request',
            options: {
              expectedField: [['enabled']],
              expectedValue: [[0]],
              API: '/api/crud/wxTemplateMessage/wechatTemplateMessages/(id)/enable',
              method: 'post'
            }
          },
          {
            title: '删除', action: 'delete'
          }
        ]
      }
    }
  ]
}
