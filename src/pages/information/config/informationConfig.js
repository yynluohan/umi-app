export default {
  layout: 'Content',
  title: '资讯列表',
  items: [
    {
      span: 24,
      layout: 'Empty',
      layoutConfig: {
        title: 'search',
        rightIcon: false,
        typeList: ['General']
      },
      component: 'BaseSearch',
      config: {
        share: 'categroy',
        fields: [
          { field: 'title', label: '标题', type: 'input' },
          {
            field: 'status',
            label: '状态',
            type: 'select',
            options: [
              { label: '草稿', value: 'Draft' },
              { label: '已发布', value: 'PublishArticle' },
              { label: '已下架', value: 'Deprecated' }
            ]
          }
        ]
      }
    },
    {
      span: 24,
      layout: 'Empty',
      component: 'BaseList',
      config: {
        share: 'categroy',
        // scroll:{ x:1400 },
        API: {
          listAPI: '/api/cms/articles?type=Article&pageSize=10',
          deleteAPI: '/api/cms/articles/(id)'
        },
        actions: [
          {
            title: '添加',
            type: 'path',
            options: {
              path: '/information/addInfor'
            }
          }
        ],
        fields: [
          { field: 'title', label: '标题', width: '250px' },
          { field: 'createdTime', label: '创建时间' },
          { field: 'updateTime', label: '发布时间' },
          { field: 'sticky', label: '排序号' },
          {
            field: 'status',
            label: '状态',
            valueType: 'status',
            options: {
              statusMap: {
                Draft: '草稿',
                PublishArticle: '已发布',
                Deprecated: '已下架'
              }
            }
          },
          { field: 'operation' }
        ],
        operation: [
          {
            title: '发布',
            action: 'request',
            options: {
              expectedField: [['status']],
              expectedValue: [['Draft']],
              API: '/api/cms/articles/(id)/action/publish',
              method: 'post'
            }
          },
          {
            title: '下架',
            action: 'request',
            options: {
              expectedField: [['status']],
              expectedValue: [['PublishArticle']],
              API: '/api/cms/articles/(id)/action/deprecate',
              method: 'post'
            }
          },
          {
            title: '重新发布',
            action: 'request',
            options: {
              expectedField: [['status']],
              expectedValue: [['Deprecated']],
              API: '/api/cms/articles/(id)/action/publish',
              method: 'post'
            }
          },
          {
            title: '详情',
            action: 'path',
            options: {
              path: '/information/viewInfor',
              queryData: (records) => {
                const data = {
                  id: records.id
                }
                return data
              }
            }
          },
          {
            title: '编辑',
            action: 'path',
            options: {
              expectedField: [['status']],
              expectedValue: [['Draft', 'Deprecated']],
              path: '/information/editInfor',
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
