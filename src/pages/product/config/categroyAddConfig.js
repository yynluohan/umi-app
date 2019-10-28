module.exports = {
  layout: 'Content',
  title: '添加子系统',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path: '/subsysManage',
        API: {
          createAPI: '/api/crud/subsys/subsyses'
        },
        fields: [
          { field: 'name', label: '名称', type: 'input' },
          {
            field: 'parentId',
            label: '父类别',
            type: 'select-fetch',
            options: {
              API: '/api/crud/product/productCategoryies',
              label: 'name',
              value: 'id'
            }
          },
          {
            field: 'email',
            label: '首页显示',
            type: 'radio',
            options: [
              {
                label: '是',
                value: 1
              },
              {
                label: '否',
                value: 0
              }
            ]
          },
          {
            field: 'account',
            label: '销售类别',
            type: 'radio',
            options: [
              {
                label: '批发',
                value: '批发'
              },
              {
                label: '零售',
                value: '零售'
              },
              {
                label: '试用',
                value: '试用'
              }
            ]
          },
          {
            field: 'visible',
            label: '点击类别显示产品详情',
            type: 'radio',
            options: [
              {
                label: '是',
                value: 1
              },
              {
                label: '否',
                value: 0
              }
            ]
          },
          { field: 'promotedProductCount', label: '首页推荐产品数量', type: 'input' },
          { field: 'sortOrder', label: '排序号', type: 'input' },
          {
            field: 'cover',
            label: '封面',
            type: 'upload-image',
            options: {
              API: '/api/uploadfile',
              max: 1
            }
          },
          { field: 'description', label: '描述', type: 'input' }
        ]
      }
    },
    {
      layout: 'Empty',
      component: 'BaseChildren',
      config: {
        itemsField: 'items',
        actions: [
          {
            title: '添加子模块',
            type: 'children-modal',
            options: {
              modalTitle: '添加子系统模块',
              modalWidth: 800,
              items: [
                {
                  layout: 'Empty',
                  component: 'ChildrenForm',
                  config: {
                    fields: [
                      { field: 'name', label: '名称', type: 'input' },
                      { field: 'price', label: '价格', type: 'input' },
                      { field: 'note', label: '备注', type: 'input' }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称', type: 'input' },
          { field: 'price', label: '价格', type: 'input' },
          { field: 'note', label: '备注', type: 'input' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'modal',
            options: {
              outside: true,
              modalTitle: '编辑字段',
              layout: 'Content',
              items: [
                {
                  layout: 'Empty',
                  component: 'ChildrenForm',
                  config: {
                    fields: [
                      { field: 'name', label: '名称', type: 'input' },
                      { field: 'price', label: '价格', type: 'input' },
                      { field: 'note', label: '备注', type: 'input' }
                    ]
                  }
                }
              ]
            }
          },
          {
            title: '移除',
            action: 'removeChild',
            options: {
              outside: true
            }
          }
        ]
      }
    }
  ]
}
