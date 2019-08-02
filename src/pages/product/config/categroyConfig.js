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
      // component: 'ChildrenList',
      component:'BaseList',
      config: {
        // itemsField: 'subCategoryList',
        share:'categroy',
        API: {
          listAPI: '/api/crud/product/productCategoryies',
          deleteAPI:'/api/crud/product/productCategoryies/(id)'
        },
        actions:[
          {
            title: '添加',type:'path',
            options:{
              path: '/product/categroyAdd'
            }
          }
        ],
        fields: [
          { field: 'name',label: '名称'},
          { field: 'cover',label: '封面',valueType:'showImage'},
          { field: 'sortOrder',label: '排序号'},
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/product/categroyView',
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
              path:'/product/categroyEdit',
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
