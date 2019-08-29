import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView';

const OrderView = ({ order }) => {

  const { item } = order;

  const statusMap = {
    'CREATED_PAY_PENDING':'待支付',
    'CLOSED_PAY_TIMEOUT':'支付超时关闭',
    'CLOSED_CANCELED':'已取消',
    'PAID_CONFIRM_PENDING':'已支付',
    'CONFIRMED_DELIVER_PENDING':'待发货',
    'DELIVERING':'发货中',
    'DELIVERED_CONFIRM_PENDING':'已发货',
    'CANCELED_RETURN_PENDING':'待退货',
    'CLOSED_CONFIRMED':'已确认收货',
    'CANCELED_REFUND_PENDING':'待退款',
    'CLOSED_REFUNDED':'已退款',
    'CONFIRMED_PICK_PENDING':'待取货',
    undefined: ''
  }

  const paymentTypeMap = {
    'WECHAT':'微信支付',
    'ALIPAY':'支付宝',
    'POINT':'积分支付',
    'STORE':'线下支付',
    'WALLET':'零钱钱包',
    'CASH': '现金',
    'CARD': '银行卡',
    undefined: ''
  }

  const deliveryTypeMap = {
    'EXPRESS': '快递',
    'SELF_PICK': '自提',
    'FLASH': '极速送达',
    undefined: ''
  }

  const originMap = {
    'WPA':'微信公众号',
    'MINI_PROGRAM':'小程序',
    'APP_ANDROID':'手机应用程序',
    'APP_IOS': '手机应用程序',
    'IPAD': '手机应用程序',
    'OTHER': '其他',
    undefined: ''
  }


  const formItemProps = {
    title: '订单详情详情',
    spanNumber: 3,
    list: [
      {label:'订单号',data: item.orderNumber},
      {label:'交易号',data:item.tradeNumber},
      {label:'状态',data:statusMap[item.status]},
      {label:'支付类型',data:paymentTypeMap[item.paymentType]},
      {label:'配送方式',data:deliveryTypeMap[item.deliveryType]},
      {label:'来源',data:originMap[item.origin]},
      {label:'总价',data:item.totalPrice},
      {label:'原价',data:item.originPrice},
      {label:'优惠券价钱',data:item.couponPrice},
      {label:'运费',data:item.freight},
      {label:'积分抵扣价钱',data:item.creditPrice},
      {label:'积分',data:item.payCredit},
      {label:'退款金额',data:item.refundFee},
      {label:'补交金额',data:item.supplementaryFee},
      {label:'下单时间',data:item.createdDate},
      {label:'支付时间',data:item.payDate},
      {label:'确认时间',data:item.confirmDate},
      {label:'开始发货时间',data:item.deliverDate},
      {label:'完成发货时间',data:item.deliveredDate},
      {label:'成交时间',data:item.dealDate},
      {label:'优惠券信息',data:item.couponInfo},
      {label:'用户昵称',data:item.contactUser},
      {label:'邀请人',data:item.inviterUserName},
      // {label:'用户期望收货时间',data:item.},
      {label:'快递公司',data:item.expressCompany},
      {label:'快递单号',data:item.expressNumber},
      {label: '订单项',data: item.orderItemList,
        columns:[
          {title: '产品封面',value: 'cover',type:'image'},
          {title: '状态',value: 'status'},
          {title: '产品名称',value: 'productName'},
          {title: '条码',value: 'barcode'},
          {title: '价格',value: 'price'},
          {title: '成本价',value: 'costPrice'},
          {title: '数量',value: 'quantity'},
          {title: '终价',value: 'finalPrice'},
        ]
      },

      {label: '处理记录',data: item.orderProcessLogList,
        columns:[
          {title: '时间',value: 'processDate',},
          {title: '内容',value: 'content'},
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
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderView);
