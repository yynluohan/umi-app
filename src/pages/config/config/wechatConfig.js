module.exports = {
  layout: 'Content',
  title: '微信配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path:'/subsysManage',
        API:{
          getAPI:'/api/crud/subsys/subsyses/[id]',
          updateAPI: '/api/crud/subsys/subsyses/[id]',
        },
        fields: [
          { field: 'a', label: 'token令牌', type: 'input' },
          { field: 'b', label: '启用消息加密', type: 'input' },
          { field: 'c', label: '消息加解密密钥', type: 'input' },
          { field: 'd', label: '应用ID', type: 'input' },
          { field: 'e', label: '应用密钥', type: 'input' },
          { field: 'f', label: '域名', type: 'input' },
          { field: 'g', label: '商户ID', type: 'input' },
          { field: 'h', label: '商户Key', type: 'input' },
          { field: 'i', label: '证书路径', type: 'input' },
          { field: 'j', label: '小程序AppId', type: 'input' },
          { field: 'k', label: '登录自动注册', type: 'input' },
          { field: 'l', label: '移动应用AppId', type: 'input' },
          { field: 'i', label: '移动应用密钥', type: 'input' },
          { field: 'm', label: '移动应用名称', type: 'input' },
          { field: 'n', label: '移动应用商家ID', type: 'input' },
          { field: 'o', label: '移动应用商家密钥', type: 'input' },
        ],
      },
    }
  ]

}
