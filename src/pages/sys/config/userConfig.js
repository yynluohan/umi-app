
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
          listAPI: '/api/crud/user/users',
          deleteAPI:'/api/crud/user/users/(id)'
        },
        actions:[
          // {
          //   title: '添加',type:'modal',
          //   options:{
          //     modalTitle:'添加用户',
          //     modalWidth:900,
          //     items:[
          //       {
          //         layout: 'BaseFormLayout',
          //         component: 'BaseForm',
          //         config: {
          //           API:{
          //             createAPI:'/api/adm/users/new'
          //           },
          //           fields: [
          //             { field: 'email', label: '邮箱',type:'input',rules: ['required'] },
          //             { field: 'account', label: '账户名',type:'input' },
          //             { field: 'name',label: '姓名',type:'input'},
          //             { field: 'avatar',label: '头像',type:'upload-image',
          //               options:{
          //                 API:'/api/uploadfile',
          //                 max: 1
          //               }
          //             },
          //             { field: 'phone', label: '电话',type:'input' },
          //             { field: 'birthday', label: '出生年月',type:'date',
          //               options:{
          //                 nowTime:false,
          //                 format: 'YYYY-MM-DD HH:mm:SS'
          //               }
          //             },
          //             { field: 'sex', label: '性别',type:'select',
          //               options:[
          //                 { label: '男',value: '0'},
          //                 { label: '女',value: '1'}
          //               ]
          //             },
          //           ]
          //         }
          //       }
          //     ]
          //   }
          // }
        ],
        fields: [
          { field: 'avatar',label: '头像',valueType:'showImage'},
          { field: 'realName', label: '名字' },
          { field: 'email', label: '邮箱'},
          { field: 'birthday', label: '出生年月' },
          { field: 'sex', label: '性别',valueType:'status',
          options:{
            statusMap:{
              '1':'男',
              '2':'女',
            }
          }
          },
          {
            field: 'status',label:'状态',valueType:'status',
            options: {
              statusMap: {
                'NORMAL':'正常',
                'LOCKED': '锁定'
              }
            }
          },
          { field: 'registerDate', label: '注册时间' },
          { field:'operation'}
        ],
        operation: [
          // {
          //   title: '编辑', action: 'modal',
          //   options:{
          //     modalTitle:'编辑用户',
          //     modalWidth:800,
          //
          //     layout: 'Empty',
          //     items:[
          //       {
          //         layout: 'BaseFormLayout',
          //         component: 'BaseForm',
          //         config: {
          //           API: {
          //             getAPI:'/api/adm/users/(id)',
          //             updateAPI: '/api/adm/users/(id)',
          //           },
          //           fields: [
          //             { field: 'email', label: '邮箱',type:'input',rules: ['required']},
          //             { field: 'account', label: '账户名',type:'input' },
          //             { field: 'name',label: '姓名',type:'input'},
          //             { field: 'avatar',label: '头像',type:'upload-image',
          //               options:{
          //                 API:'/api/uploadfile',
          //                 max: 1
          //               }
          //             },
          //             { field: 'phone', label: '电话',type:'input' },
          //             { field: 'birthday', label: '出生年月',type:'date',
          //               options:{
          //                 nowTime:false,
          //                 format: 'YYYY-MM-DD HH:mm:SS'
          //               }
          //             },
          //             { field: 'sex', label: '性别',type:'select',
          //               options:[
          //                 { label: '男',value: '0'},
          //                 { label: '女',value: '1'}
          //               ]
          //             },
          //           ]
          //         }
          //       }
          //     ]
          //   }
          // },
          {
            title:'查看',action:'path',
            options: {
              path: '/sys/userView',
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
