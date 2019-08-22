
module.exports = {
  layout: 'Content',
  title: '优惠券使用情况',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share:'user',
        fields: [
          { field: 'code', label: '编码', type: 'input' },
          { field: 'name', label: '名称', type: 'input' },
          { field: 'user', label: '用户', type: 'input' },
          { field: 'status', label: '状态', type: 'select',
            options:[
              {label: '未激活',value:'1'},
              {label: '已激活',value:'2'},
              {label: '已过期',value:'3'},
              {label: '已使用',value:'4'}
            ]
          }
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share:'user',
        API: {
          listAPI: '/api/adm/users',
          deleteAPI:'/api/adm/users/(id)'
        },
        fields: [
          { field: 'name', label: '名称' },
          { field: 'type',label: '类型',valueType:'status',
            options: {
              statusMap: {
                'PRECISION_MARKETING': '精准营销',
                'REGISTER': '新用户注册赠送'
              }
            }
          },
          { field: 'status',label: '状态',valueType:'status',
            options: {
              statusMap: {
                'PRECISION_MARKETING': '精准营销',
                'REGISTER': '新用户注册赠送'
              }
            }
          },
          { field: 'user', label: '用户' },
          { field: 'effectTime', label: '有效期'},
        ],
        operation: [
          {
            title:'删除',action:'delete'
          }
        ]
      },
    },
  ],
};
