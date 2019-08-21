import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView';

const WechatTemplateView = ({ dispatch,sys }) => {

  const { item } = sys;

  const typeObj = {
    'orderCreated':'成功下单通知',
     'orderCefunded':'订单退款通知',
     'orderCanceled':'取消订单通知',
     'orderPayTimeout':'订单支付超时通知',
     'orderDelivering':'订单发货通知',
     'orderServiceCreated':'订单退款申请通知',
     'rewardCashApplying':'提现申请提交成功通知',
     'rewardCashHandling':'提现申请处理中通知',
     'rewardCashRejected':'提现申请被拒绝通知',
     'rewardCashCompleted':'成功提现通知',
     'couponDispatched':'优惠券发送通知',
     'couponOverdue':'优惠券即将到期通知',
     'tempCrownApproved':'成为临时皇冠商通知',
     'physicalSellerApproved':'成为星级经销商通知',
     'tempCrownResetted':'临时皇冠商撤销通知',
  }

  const enabledObj = {
    0: '禁用',
    1: '启用'
  }

  const formItemProps = {
    title: '微信模版消息详情',
    list: [
      {label:'类型',data: typeObj[item.type]},
      {label:'是否启用',data: enabledObj[item.enabled]},
      {label:'模板id',data: item.templateId},
      {label:'名称',data:item.name},
      {label: '属性配置',data: item.items,
        columns:[
          {title: '属性',value: 'name'},
          {title: '模板消息属性',value: 'displayAttr'},
          {title: '固定显示值',value: 'displayValue'},
        ]
      }
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(WechatTemplateView);
