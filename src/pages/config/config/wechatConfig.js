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
          getAPI:'/api/crud/configmanagement/configs/wechatConfig',
          createAPI: '/api/crud/configmanagement/configs/wechatConfig',
        },
        fields: [
          { field: 'token', label: 'token令牌', type: 'input' },
          { field: 'encryptMessage', label: '启用消息加密', type: 'input' },
          { field: 'encodingAesKey', label: '消息加解密密钥', type: 'input' },
          { field: 'appId', label: '应用ID', type: 'input' },
          { field: 'appSecret', label: '应用密钥', type: 'input' },
          { field: 'host', label: '域名', type: 'input' },
          { field: 'partnerId', label: '商户ID', type: 'input' },
          { field: 'appPartnerKey', label: '商户Key', type: 'input' },
          { field: 'certPath', label: '证书路径', type: 'input' },
          { field: 'wxaAppid', label: '小程序AppId', type: 'input' },
          { field: 'autoReg', label: '登录自动注册', type: 'input' },
          { field: 'appAppid', label: '移动应用AppId', type: 'input' },
          { field: 'appAppSecret', label: '移动应用密钥', type: 'input' },
          { field: 'appName', label: '移动应用名称', type: 'input' },
          { field: 'appPartnerId', label: '移动应用商家ID', type: 'input' },
          { field: 'partnerKey', label: '移动应用商家密钥', type: 'input' },
        ],
      },
    }
  ]

}
