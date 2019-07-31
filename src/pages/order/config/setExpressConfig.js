export default {
  layout: 'Content',
  title: '快递设置',
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
          { field: 'name',label: '模板名称',type:'input'},
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
        actions:[
          {
            title: '添加新快递公司信息',type:'modal',
            options:{
              modalTitle:'添加快递公司',
              modalWidth:900,
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API:{
                      createAPI:'/api/crud/product/productTags'
                    },
                    fields: [
                      { field: 'name',label: '名称',type:'input'},
                      { field: 'code',label: '代码',type:'input'},
                      { field: 'moren',label: '是否默认',type:'radio',
                        options:[
                          { label: '是',value: '1'},
                          { label: '否',value: '0'},
                        ]
                      },
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'code',label: '编号'},
          { field: 'name',label: '名称'},
          { field: 'coding',label: '代码'},
          { field: 'status',label: '是否默认',valueType:'status',
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
            title: '编辑', action: 'modal',
            options:{
              modalTitle:'编辑快递公司',
              modalWidth:800,

              layout: 'Empty',
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI:'/api/crud/product/productTags/(id)',
                      updateAPI: '/api/crud/product/productTags/(id)',
                    },
                    fields: [
                      { field: 'name',label: '名称',type:'input'},
                      { field: 'code',label: '代码',type:'input'},
                      { field: 'moren',label: '是否默认',type:'radio',
                        options:[
                          { label: '是',value: '1'},
                          { label: '否',value: '0'},
                        ]
                      },
                    ]
                  }
                }
              ]
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
