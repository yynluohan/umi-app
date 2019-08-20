
module.exports = {
  layout: 'Content',
  title: '微信模版消息设置',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share:'user',
        fields: [
          { field: 'name', label: '名称', type: 'input' }
        ],
      },
    },
    {
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share:'user',
        API: {
          listAPI: '/api/ad/groups',
          deleteAPI:'/api/ad/groups/(id)'
        },
        actions:[
          {
            title: '添加',type:'path',
            options:{
              path: '/sys/wechatTemplateAdd'
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称'},
          { field: 'type', label: '类型'},
          { field: 'id', label: '模板id'},
          { field: 'enabled', label: '是否启用',
            options: [
              {label: '启用',value: 1},
              {label: '禁用',value: 0}
            ]
          },
          { field:'operation'}
        ],
        operation: [
          {
            title: '查看',action: 'path',
            options:{
              path:'/sys/wechatTemplateView',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '编辑', action: 'path',
            options:{
              path: '/sys/wechatTemplateEdit',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title:'删除',action:'delete'
          }
        ]
      },
    },
  ],
};
