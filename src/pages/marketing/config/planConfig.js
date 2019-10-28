
module.exports = {
  layout: 'Content',
  title: '营销方案',
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
          listAPI: '/api/adm/users',
          deleteAPI: '/api/adm/users/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'modal',
            options: {
              modalTitle: '新建优惠券策略',
              modalWidth: 1000,
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      createAPI: '/api/adm/users/new'
                    },
                    fields: [
                      { field: 'name', label: '名称', type: 'input', rules: ['required'] },
                      { field: 'description', label: '描述', type: 'input' },
                      {
                        field: 'type',
                        label: '类型',
                        type: 'select',
                        options: [
                          { label: '精准营销', value: 'PRECISION_MARKETING' },
                          { label: '新用户注册赠送', value: 'REGISTER' }
                        ]
                      },
                      { field: 'randomNumber', label: '随机赠送优惠券数量', type: 'input', placeholder: '如果为0, 则该策略下的优惠券全送' },
                      {
                        field: 'group',
                        label: '目标人群',
                        type: 'radio',
                        options: [
                          { label: '所有会员', value: 'all' },
                          { label: '部分会员', value: 'some' }
                        ]
                      },
                      { field: 'startTime', label: '营销开始时间', type: 'date' },
                      { field: 'endTime', label: '营销结束时间', type: 'date' }
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称' },
          { field: 'description', label: '描述' },
          {
            field: 'type',
            label: '类型',
            valueType: 'status',
            options: {
              statusMap: {
                PRECISION_MARKETING: '精准营销',
                REGISTER: '新用户注册赠送'
              }
            }
          },
          { field: 'randomNumber', label: '随机赠送优惠券数量' },
          {
            field: 'group',
            label: '目标人群',
            valueType: 'status',
            options: {
              all: '所有会员',
              some: '部分会员'
            }
          },
          { field: 'startTime', label: '营销开始时间' },
          { field: 'endTime', label: '营销结束时间' }
        ],
        operation: [
          {
            title: '编辑',
            action: 'modal',
            options: {
              modalTitle: '编辑优惠券策略',
              modalWidth: 1000,

              layout: 'Empty',
              items: [
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI: '/api/adm/users/(id)',
                      updateAPI: '/api/adm/users/(id)'
                    },
                    fields: [
                      { field: 'name', label: '名称', type: 'input', rules: ['required'] },
                      { field: 'description', label: '描述', type: 'input' },
                      {
                        field: 'type',
                        label: '类型',
                        type: 'select',
                        options: [
                          { label: '精准营销', value: 'PRECISION_MARKETING' },
                          { label: '新用户注册赠送', value: 'REGISTER' }
                        ]
                      },
                      { field: 'randomNumber', label: '随机赠送优惠券数量', type: 'input', placeholder: '如果为0, 则该策略下的优惠券全送' },
                      {
                        field: 'group',
                        label: '目标人群',
                        type: 'radio',
                        options: [
                          { label: '所有会员', value: 'all' },
                          { label: '部分会员', value: 'some' }
                        ]
                      },
                      { field: 'startTime', label: '营销开始时间', type: 'date' },
                      { field: 'endTime', label: '营销结束时间', type: 'date' }
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
