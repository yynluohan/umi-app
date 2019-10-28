
module.exports = {
  layout: 'Content',
  title: '打印机管理',
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
          listAPI: '/api/printer',
          deleteAPI: '/api/printer/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'modal',
            options: {
              modalTitle: '添加',
              modalWidth: 900,
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      createAPI: '/api/printer'
                    },
                    fields: [
                      { field: 'partner', label: '名称', type: 'input', rules: ['required'] },
                      { field: 'machineCode', label: '打印机 Code', type: 'input', rules: ['required'] },
                      { field: 'machineKey', label: '机器 Key', type: 'input', rules: ['required'] },
                      { field: 'apiKey', label: 'apiKey', type: 'input', rules: ['required'] },
                      { field: 'note', label: '备注', type: 'input' }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'partner', label: '名称' },
          { field: 'machineCode', label: '打印机 Code' },
          { field: 'machineKey', label: '机器 Key' },
          { field: 'apiKey', label: 'apiKey' },
          { field: 'note', label: '备注' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'modal',
            options: {
              modalTitle: '编辑广告',
              modalWidth: 800,
              layout: 'Empty',
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI: '/api/printer',
                      updateAPI: '/api/printer/(id)'
                    },
                    fields: [
                      { field: 'partner', label: '名称', type: 'input', rules: ['required'] },
                      { field: 'machineCode', label: '打印机 Code', type: 'input', rules: ['required'] },
                      { field: 'machineKey', label: '机器 Key', type: 'input', rules: ['required'] },
                      { field: 'apiKey', label: 'apiKey', type: 'input', rules: ['required'] },
                      { field: 'note', label: '备注', type: 'input' }
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
