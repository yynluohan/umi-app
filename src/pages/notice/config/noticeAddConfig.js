
module.exports = {
  layout: 'Content',
  title: '添加通知',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        API: {
          createAPI:'/api/cms/notice/notices'
        },
        fields: [
          { field: 'title',label: '标题',type: 'input'},
          { field: 'author',label:'作者',type: 'input'},
          { field: 'type', label: '通知人员',type:'radio',
            options: [
              { label:'C端用户及门店',value: 'System'},
              { label:'门店员工',value: 'Internal'},
              { label:'C端用户',value: 'External'}
            ]
          },
          { field: 'orderNum',label:'排序号',type: 'input'},
          { field: 'content',label:'内容',type: 'rich-text'},
         { field:'operation'}
        ]
      },
    },
  ],
};
