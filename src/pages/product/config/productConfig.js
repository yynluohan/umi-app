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
          { field: 'status',label: '状态',type:'select',
            options: [
              { label: '草稿',value: 'DRAFT' },
              { label: '待审核',value: 'PENDING_APPROVAL' },
              { label: '已审核',value: 'APPROVED' },
              { label: '上架',value: 'ONSELL' },
              { label: '下架',value: 'OFFSELL'}
            ]
          },
          { field: 'categoryId',label: '类别',type: 'input'},
          { field: 'brand',label: '品牌',type: 'input'},
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
          listAPI: '/api/crud/product/products',
          deleteAPI:'/api/crud/product/products/(id)'
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
          { field: 'skuCode',label: '编号'},
          { field: 'cover',label: '封面',valueType: 'showImage'},
          { field: 'sign',label: '品牌'},
          { field: 'name',label: '名称'},
          { field: 'categoryId',label: '类别'},
          { field: 'status',label: '状态',valueType: 'showStatus',
            options:{
              statusMap: {
                'ONSELL':'上架',
                'OFFSELL':'下架'
              },
              colorMap: {
                'ONSELL': '#428bca',
                'OFFSELL': '#777'
              }
            }
          },
          { field: 'price',label: '价格'},
          { field: 'barCode',label: '条形码'},
          { field: 'sortOrder',label: '排序号'},
          { field:'operation'}
        ],
        operation: [
          {
            title:'查看',action:'path',
            options:{
              path:'/product/productView',
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
              path:'/product/productEdit',
              queryData:(records) => {
                const data = {
                  id:records.id,
                }
                return data
              }
            }
          },
          {
            title: '上架',action:'request',
            options:{
              expectedField:[['status']],
              expectedValue:[['OFFSELL']],
              API:'/api/crud/product/products/(id)/(status)',
              method:'post'
            }
          },
          {
            title: '下架',action:'request',
            options:{
              expectedField:[['status']],
              expectedValue:[['ONSELL']],
              API:'/api/crud/product/products/(id)/(status)',
              method:'post'
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
