
module.exports = {
  layout: 'Content',
  title: '用户管理',
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
          listAPI: '/api/ad',
          deleteAPI:'/api/ad/(id)'
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
                      createAPI:'/api/ad'
                    },
                    fields: [
                      { field: 'name', label: '名称',type:'input',rules: ['required'] },
                      { field: 'groupId', label: '组',type:'select-fetch',rules: ['required'],
                        options: {
                          API: '/api/ad/groups',
                          label:'name',
                          value:'id',
                          dataField: 'data'
                        }
                      },
                      { field: 'enabled', label: '是否启用',type:'radio',
                        options: [
                          { label: '是',value: 1},
                          { label: '否',value: 0}
                        ]
                      },
                      { field: 'strategyStr', label: '轮播策略',type:'checkbox',
                        options: [
                          { label: '每天',value: 'EVERY_DAY'},
                          { label: '单号',value: 'ODD_DAY'},
                          { label: '双号',value: 'EVEN_DAY'},
                          { label: '单时',value: 'ODD_HOUR'},
                          { label: '双时',value: 'EVEN_HOUR'}
                        ]
                      },
                      { field: 'type', label: '类型',type:'input' },
                      { field: 'logo', label: '图片',type:'upload-image',
                        options: {
                          API: `${window.MC.UPLOADHOST}/api/uploadfile`,
                          max: 1
                        }
                     },
                     { field: 'targetUrl', label: '目标链接',type:'input' },
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'name', label: '名称'},
          { field: 'groupId', label: '组'},
          { field: 'enabled', label: '是否启用',valueType:'status',
            options: {
              statusMap: {
                1: '是',
                0: '否'
              }
            }
          },
          { field: 'strategyStr', label: '轮播策略',valueType:'status',
            options: {
              statusMap: {
                'EVERY_DAY': '每天',
                'ODD_DAY': '单号',
                'EVEN_DAY': '双号',
                'ODD_HOUR':'单时',
                'EVEN_HOUR': '双时'
              }
            }
          },
          { field: 'type', label: '类型' },
          { field: 'logo', label: '图片',valueType:'showImage'},
          { field: 'targetUrl', label: '目标链接' },
          { field:'operation'}
        ],
        operation: [
          {
            title: '编辑', action: 'modal',
            options:{
              modalTitle:'编辑广告',
              modalWidth:800,
              layout: 'Empty',
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI:'/api/ad',
                      updateAPI: '/api/ad/(id)',
                    },
                    fields: [
                      { field: 'name', label: '名称',type:'input',rules: ['required'] },
                      { field: 'groupId', label: '组',type:'select-fetch',rules: ['required'],
                        options: {
                          API: '/api/ad/groups',
                          label:'name',
                          value:'id',
                          dataField: 'data'
                        }
                      },
                      { field: 'enabled', label: '是否启用',type:'radio',
                        options: [
                          { label: '是',value: 1},
                          { label: '否',value: 0}
                        ]
                      },
                      { field: 'strategyStr', label: '轮播策略',type:'checkbox',
                        options: [
                          { label: '每天',value: 'EVERY_DAY'},
                          { label: '单号',value: 'ODD_DAY'},
                          { label: '双号',value: 'EVEN_DAY'},
                          { label: '单时',value: 'ODD_HOUR'},
                          { label: '双时',value: 'EVEN_HOUR'}
                        ]
                      },
                      { field: 'type', label: '类型',type:'input' },
                      { field: 'logo', label: '图片',type:'upload-image',
                        options: {
                          API: `${window.MC.UPLOADHOST}/api/uploadfile`,
                          max: 1
                        }
                     },
                     { field: 'targetUrl', label: '目标链接',type:'input' },
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
