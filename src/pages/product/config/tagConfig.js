
module.exports = {
  layout: 'Content',
  title: '标签管理',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share: 'user',
        fields: [
          { field: 'name', label: '标签名', type: 'input' }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'user',
        API: {
          listAPI: '/api/crud/product/productTags',
          deleteAPI: '/api/crud/product/productTags/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'modal',
            options: {
              modalTitle: '添加标签',
              modalWidth: 900,
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      createAPI: '/api/crud/product/productTags'
                    },
                    fields: [
                      { field: 'identifier', label: '标记', type: 'input' },
                      { field: 'name', label: '名称', type: 'input' },
                      { field: 'sortOrder', label: '排序号', type: 'input' }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'identifier', label: '标记' },
          { field: 'name', label: '名称' },
          { field: 'sortOrder', label: '排序号' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'modal',
            options: {
              modalTitle: '编辑用户',
              modalWidth: 800,

              layout: 'Empty',
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI: '/api/crud/product/productTags/(id)',
                      updateAPI: '/api/crud/product/productTags/(id)'
                    },
                    fields: [
                      { field: 'identifier', label: '标记', type: 'input' },
                      { field: 'name', label: '名称', type: 'input' },
                      { field: 'sortOrder', label: '排序号', type: 'input' }
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
