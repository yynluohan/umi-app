
module.exports = {
    layout: 'Content',
    title: '商品分类',
    items: [
      {
        layout: 'Empty',
        component: 'BaseSearch',
        config: {
          share:'user',
          fields: [
            { field: 'categoryName', label: '类别名称', type: 'input' }
          ],
        },
      },
      {
        layout: 'Empty',
        component: 'BaseList',
        config: {
          share:'user',
          API: {
            listAPI: '/api/product/categories',
            deleteAPI:'/api/product/categories/(id)'
          },
          actions:[
            {
              title: '添加',type:'modal',
              options:{
                modalTitle:'添加商品分类',
                modalWidth:800,
                items:[
                  {
                    layout: 'BaseFormLayout',
                    component: 'BaseForm',
                    config: {
                      API:{
                        createAPI:'/api/product/categories'
                      },
                      fields: [
                        { field: 'categoryCode', label: '类别编号',type:'input',rules: ['required'] },
                        { field: 'categoryName', label: '类别名称',type:'input',rules: ['required'] },
                        { field: 'categoryDescription',label: '类别描述',type:'input'},
                      ]
                    }
                  }
                ]
              }
            }
          ],
          fields: [
            { field: 'categoryCode',label: '类别编号'},
            { field: 'categoryName',label:'类别名称'},
            { field: 'categoryDescription', label: '类别描述' },
            { field:'operation'}
          ],
          operation: [
            {
              title: '编辑', action: 'modal',
              options:{
                modalTitle:'编辑商品分类',
                modalWidth:800,
            
                layout: 'Empty',
                items:[
                  {
                    layout: 'BaseFormLayout',
                    component: 'BaseForm',
                    config: {
                      API: {
                        getAPI:'/api/product/categories/(id)',
                        updateAPI: '/api/product/categories/(id)',
                      },
                      fields: [
                        { field: 'categoryCode', label: '类别编号',type:'input',rules: ['required'] },
                        { field: 'categoryName', label: '类别名称',type:'input',rules: ['required'] },
                        { field: 'categoryDescription',label: '类别描述',type:'input'},
                      ]
                    }
                  }
                ]
              }
            },
            // {
            //   title:'查看',action:'path',
            //   options: {
            //     path: '/sys/userView',
            //     queryData:(records) => {
            //       const data = {
            //         id:records.id,
            //       }
            //       return data
            //     }
            //   }
            // },
            {
              title:'删除',action:'delete'
            }
          ]
        },
      },
    ],
  };
  