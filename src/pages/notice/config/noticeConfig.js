
module.exports = {
  layout: 'Content',
  title: '通知管理',
  items: [
    {
      layout: 'Empty',
      component: 'BaseSearch',
      config: {
        share:'user',
        fields: [
          { field: 'title', label: '标题', type: 'input' },
          { field: 'status', label: '状态', type: 'select',
            options: [
              {label: '草稿',value:'Draft'},
              {label: '已发布',value:'Publish'},
              {label: '已下架',value:'Deprecated'},
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
          listAPI: '/api/cms/notice/notices',
          deleteAPI:'/api/cms/notice/notices/(id)'
        },
        actions:[
          {title:'添加',type:'path',
            options: {path: '/notice/noticeAdd'}
          }
        ],
        fields: [
          { field: 'title',label: '标题',},
          { field: 'author',label:'作者'},
          { field: 'createTime', label: '创建时间' },
          { field: 'updateTime', label: '发布时间'},
          { field: 'orderNum', label: '排序' },
          { field: 'status', label: '状态',valueType:'status',
          options:{
            statusMap:{
              'Draft':'草稿',
              'Publish':'已发布',
              'Deprecated':'已下架'
            }
          }
         },
         { field:'operation'}
        ],
        operation: [
          {
            title: '编辑', action: 'path',
            options:{
              path: '/notice/noticeEdit',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title:'查看',action:'path',
            options: {
              path: '/sys/noticeView',
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
