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
          listAPI: '/api/crud/order/expresses',
          deleteAPI:'/api/crud/order/expresses/(id)'
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
                      createAPI:'/api/crud/order/expresses'
                    },
                    fields: [
                      { field: 'name',label: '名称',type:'input'},
                      { field: 'code',label: '代码',type:'input'},
                      { field: 'isDefault',label: '是否默认',type:'radio',
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
          { field: 'id',label: '编号'},
          { field: 'name',label: '名称'},
          { field: 'code',label: '代码'},
          { field: 'isDefault',label: '是否默认',valueType:'showStatus',
            options: {
              statusMap: {
                1:'是',
                0:'否'
              },
              colorMap: {
                1: '#428bca',
                0: '#777'
              }
            }
          },
          { field:'operation'}
        ],
        operation: [
          // {
          //   title:'查看',action:'path',
          //   options:{
          //     path:'/subsysManage-view',
          //     // permission:'apply.view',
          //     // location:true
          //     queryData:(records) => {
          //       const data = {
          //         id:records.id,
          //       }
          //       return data
          //     }
          //   }
          // },
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
                      getAPI:'/api/crud/order/expresses/(id)',
                      updateAPI: '/api/crud/order/expresses/(id)',
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
