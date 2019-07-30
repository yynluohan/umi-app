export default {
  layout: 'Content',
  title: '产品列表',
  items: [
    {
      span: 24,
      layout:'Empty',
      layoutConfig:{
        title: 'search',
        rightIcon:false,
        typeList:['General']
      },
      component: 'BaseSearch',
      config: {
        share:'product',
        fields: [
          { field: 'name',label: '名称',type:'input'},
          { field: 'barCode',label: '条形码',type: 'input'},
          { field: 'status',label: '名称',type:'select',
            options: [
              { label: '草稿',value: 'DRAFT' },
              { label: '待审核',value: 'PENDING_APPROVAL' },
              { label: '已审核',value: 'APPROVED' },
              { label: '上架',value: 'ONSELL' },
              { label: '下架',value: 'OFFSELL'}
            ]
          },
          { field: 'categoryId',label: '类别',type: 'input'},
          { field: 'promoted',label: '推荐',type: 'select',
            options: [
              { label: '否',value: '0' },
              { label: '是',value: '1'},
            ]
          }
        ]
      }
    },
    {
      span: 24,
      layout:'Empty',
      component: 'BaseList',
      config: {
        share:'product',
        // scroll:{x:2750},
        API: {
          listAPI: '/api/crud/subsys/subsyses',
          deleteAPI:'/api/crud/subsys/subsyses/(id)'
        },
        actions:[
          {
            title: '添加',type:'path',
            options:{
              path: '/product/productAdd'
            }
          }
        ],
        fields: [
          { field: 'code',label: '编号'},
          { field: 'cover',label: '封面'},
          { field: 'sign',label: '品牌'},
          { field: 'name',label: '名称'},
          { field: 'type',label: '类别'},
          { field: 'status',label: '状态'},
          { field: 'price',label: '价格'},
          { field: 'template',label: '运费模板'},
          { field: 'sort',label: '排序号'},
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/subsysManage-view',
              // permission:'apply.view',
              // location:true
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '编辑',action:'path',
            options:{
              path:'/subsysManage-edit',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '删除',action: 'delete'
          }
        ],
      },
    },
  ]
}
