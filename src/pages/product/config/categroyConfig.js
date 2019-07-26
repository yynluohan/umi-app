export default {
  layout: 'Content',
  title: '产品类别',
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
          { field: 'name',label: '类别名称',type:'input'}
        ]
      }
    },
    {
      span: 24,
      layout:'Empty',
      component: 'BaseList',
      config: {
        share:'categroy',
        // scroll:{x:2750},
        API: {
          listAPI: '/api/crud/product/productCategoryies',
          deleteAPI:'/api/crud/product/productCategoryies/(id)'
        },
        actions:[
          {
            title: '添加',type:'path',
            options:{
              path: '/subsysManage-add'
            }
          }
        ],
        fields: [
          { field: 'name',label: '名称'},
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
