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
          listAPI: '/api/crud/subsys/subsyses',
          deleteAPI:'/api/crud/subsys/subsyses/(id)'
        },
        fields: [
          { field: 'code',label: '订单编号'},
          { field: 'oderTime',label: '下单时间'},
          { field: 'name',label: '商品名称'},
          { field: 'rank',label: '评价等级'},
          { field: 'content',label: '评价内容'},
          { field: 'time',label: '评价时间'},
          { field: 'reply',label: '回复时间'},
          { field: 'top',label: '置顶'},
          { field: '1',label: '屏蔽'},
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
