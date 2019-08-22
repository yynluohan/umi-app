export default {
  layout: 'Content',
  title: '评价管理',
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
          { field: 'name',label: '商品名称',type:'input'},
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
          listAPI: '/api/cms/evaluations',
          deleteAPI:'/api/cms/evaluations/(id)'
        },
        fields: [
          { field: 'tradeNumber',label: '订单编号'},
          { field: 'tradeTime',label: '下单时间'},
          { field: 'productName',label: '商品名称'},
          { field: 'commentStar',label: '评价等级'},
          { field: 'commentContent',label: '评价内容'},
          { field: 'commentTime',label: '评价时间'},
          { field: 'replyTime',label: '回复时间'},
          { field: 'isStick',label: '置顶',valueType:'status',
            options:{
              0: '不置顶',
              1: '置顶'
            }
          },
          { field: 'isDisplay',label: '屏蔽',valueType:'status',
            options:{
              0: '不屏蔽',
              1: '屏蔽'
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
