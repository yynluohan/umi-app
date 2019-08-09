export default {
  layout: 'Content',
  title: '员工列表',
  items: [
    {
      span: 24,
      layout:'Empty',
      component: 'BaseList',
      config: {
        share:'categroy',
        API: {
          listAPI: '/api/store/assistants',
          deleteAPI:'/api/store/assistants/(id)'
        },
        actions:[
          {
            title: '添加店员',type:'path',
            options:{
              path: '/store/addStore'
            }
          }
        ],
        fields: [
          { field: 'name',label: '姓名'},
          { field: 'code',label: '员工工号'},
          { field: 'qq',label: 'qq'},
          { field: 'isDirector',label: '角色',valueType:'status',
            options: {
              statusMap: {
                '0':'店长',
              }
            }
          },
          { field: 'avatar',label: '员工QR'},
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/store/viewStore',
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
