module.exports = {
  layout: 'Content',
  title: '支付宝配置',
  items: [
    {
      layout: 'BaseFormLayout',
      component: 'BaseForm',
      config: {
        path: '/subsysManage',
        API: {
          getAPI: '/api/crud/configmanagement/configs/alipayConfig',
          createAPI: '/api/crud/configmanagement/configs/alipayConfig'
        },
        fields: [
          { field: 'appId', label: '应用ID', type: 'input' },
          { field: 'alipayPublicKey', label: '应用密钥', type: 'input' },
          { field: 'appSecret', label: '支付宝公钥', type: 'input' }
        ]
      }
    }
  ]

}
