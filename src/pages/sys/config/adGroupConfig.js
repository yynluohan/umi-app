
module.exports = {
  layout: 'Content',
  title: '广告组',
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
            title: '添加',type:'modal',
            options:{
              modalTitle:'添加',
              modalWidth:900,
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API:{
                      createAPI:'/api/ad/groups'
                    },
                    fields: [
                      { field: 'name', label: '名称',type:'input',rules: ['required'] },
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称'},
          { field:'operation'}
        ],
        operation: [
          {
            title: '查看',action: 'path',
            options:{
              path:'/sys/adGroupView',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '编辑', action: 'modal',
            options:{
              modalTitle:'编辑广告组',
              modalWidth:800,

              layout: 'Empty',
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI:'/api/ad/groups/(id)',
                      updateAPI: '/api/ad/groups/(id)',
                    },
                    fields: [
                      { field: 'name', label: '名称',type:'input',rules: ['required']},
                    ]
                  }
                }
              ]
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
