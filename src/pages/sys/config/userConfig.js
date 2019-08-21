
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
          { field: 'account', label: '账户名', type: 'input' }
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
        actions:[
          {
            title: '添加',type:'modal',
            options:{
              modalTitle:'添加用户',
              modalWidth:900,
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API:{
                      createAPI:'/api/adm/users/new'
                    },
                    fields: [
                      { field: 'email', label: '邮箱',type:'input',rules: ['required'] },
                      { field: 'account', label: '账户名',type:'input' },
                      { field: 'name',label: '姓名',type:'input'},
                      { field: 'avatar',label: '头像',type:'upload-image',
                        options:{
                          API:'/api/uploadfile',
                          max: 1
                        }
                      },
                      { field: 'phone', label: '电话',type:'input' },
                      { field: 'birthday', label: '出生年月',type:'date',
                        options:{
                          nowTime:false,
                          format: 'YYYY-MM-DD HH:mm:SS'
                        }
                      },
                      { field: 'sex', label: '性别',type:'select',
                        options:[
                          { label: '男',value: '0'},
                          { label: '女',value: '1'}
                        ]
                      },
                    ]
                  }
                }
              ]
            }
          }
        ],
        fields: [
          { field: 'email', label: '邮箱'},
          { field: 'account', label: '账户名' },
          { field: 'avatar',label: '头像',valueType:'image'},
          { field: 'birthday', label: '出生年月' },
          { field: 'sex', label: '性别',valueType:'status',
          options:{
            statusMap:{
              '0':'男',
              '1':'女',
            }
          }
          },
          { field: 'registeredGithubUsername', label: 'github账号' },
          {
            field: 'platformRoles',label:'平台角色',valueType:'status',
            options: {
              statusMap: {
                'SUBSYS_OWNER':'子系统持有者',
                'MODULE_OWNER': '模块持有者',
                'TENANT': '租户',
                'AGENT': '代理'
              }
            }
          },
          { field: 'createtime', label: '创建时间' },
          { field:'operation'}
        ],
        operation: [
          {
            title: '编辑', action: 'modal',
            options:{
              modalTitle:'编辑用户',
              modalWidth:800,

              layout: 'Empty',
              items:[
                {
                  layout: 'BaseFormLayout',
                  component: 'BaseForm',
                  config: {
                    API: {
                      getAPI:'/api/adm/users/(id)',
                      updateAPI: '/api/adm/users/(id)',
                    },
                    fields: [
                      { field: 'email', label: '邮箱',type:'input',rules: ['required']},
                      { field: 'account', label: '账户名',type:'input' },
                      { field: 'name',label: '姓名',type:'input'},
                      { field: 'avatar',label: '头像',type:'upload-image',
                        options:{
                          API:'/api/uploadfile',
                          max: 1
                        }
                      },
                      { field: 'phone', label: '电话',type:'input' },
                      { field: 'birthday', label: '出生年月',type:'date',
                        options:{
                          nowTime:false,
                          format: 'YYYY-MM-DD HH:mm:SS'
                        }
                      },
                      { field: 'sex', label: '性别',type:'select',
                        options:[
                          { label: '男',value: '0'},
                          { label: '女',value: '1'}
                        ]
                      },
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
