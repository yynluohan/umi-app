export default {
  layout: 'Content',
  title: '员工列表',
  items: [
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'categroy',
        API: {
          listAPI: '/api/store/assistants',
          deleteAPI: '/api/store/assistants/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'modal',
            options: {
              modalTitle: '添加店员',
              modalWidth: 900,
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      createAPI: '/api/store/assistants'
                    },
                    fields: [
                      {
                        field: 'name',
                        label: '选择员工',
                        type: 'select-fetch',
                        rules: ['required'],
                        options: {
                          API: '/rest/staff',
                          label: 'name',
                          value: 'id'
                        }
                      },
                      { field: 'code', label: '店员编号', type: 'input' },
                      {
                        field: 'isDirector',
                        label: '选择职称',
                        type: 'select',
                        options: [
                          { label: '店长', value: 0 },
                          { label: '店员', value: 1 }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '姓名' },
          { field: 'code', label: '员工工号' },
          { field: 'qq', label: 'qq' },
          {
            field: 'isDirector',
            label: '角色',
            valueType: 'status',
            options: {
              statusMap: {
                0: '店长'
              }
            }
          },
          { field: 'avatar', label: '员工QR' },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '查看',
            action: 'path',
            options: {
              path: '/store/viewStore',
              // permission:'apply.view',
              // location:true
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
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
