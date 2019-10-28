
module.exports = {
  layout: 'Content',
  title: '品牌管理',
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
          listAPI: '/api/crud/product/productBrands',
          deleteAPI: '/api/crud/product/productBrands/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'modal',
            options: {
              modalTitle: '添加品牌',
              modalWidth: 900,
              items: [
                {
                  layout: 'Empty',
                  component: 'BaseForm',
                  config: {
                    API: {
                      createAPI: '/api/crud/product/productBrands'
                    },
                    fields: [
                      { field: 'name', label: '名称', type: 'input', rules: ['required'] },
                      {
                        field: 'logo',
                        label: 'logo',
                        type: 'upload-image',
                        options: {
                          API: `${window.MC.UPLOADHOST}/api/uploadfile`,
                          max: 1
                        }
                      },
                      { field: 'description', label: '描述', type: 'input' }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称' },
          { field: 'logo', label: 'logo', valueType: 'showImage' },
          { field: 'description', label: '描述' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'modal',
            options: {
              modalTitle: '编辑品牌',
              modalWidth: 800,

              layout: 'Empty',
              items: [
                {
                  layout: 'Empty',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI: '/api/crud/product/productBrands/(id)',
                      updateAPI: '/api/crud/product/productBrands/(id)'
                    },
                    fields: [
                      { field: 'name', label: '名称', type: 'input', rules: ['required'] },
                      {
                        field: 'logo',
                        label: 'logo',
                        type: 'upload-image',
                        options: {
                          API: `${window.MC.UPLOADHOST}/api/uploadfile`,
                          max: 1
                        }
                      },
                      { field: 'description', label: '描述', type: 'input' }
                    ]
                  }
                }
              ]
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
