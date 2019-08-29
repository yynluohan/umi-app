import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const DistributorOutView = ({ supply }) => {

  let { item } = supply;

  item && item.outItems && item.outItems.length > 0 && item.outItems.map((k,index) => {
    item.outItems[index] = {
        ...k,
        totalMoney: '￥' + (k.transactionQuantities || 0) * (k.transactionSkuPrice || 0)
    }
  })

  const formItemProps = {
    title: '分销订单详情',
    list: [
      {label:'订单编号',data: item.salesCode},
      {label:'订单创建人',data: item.originatorName},
      {label:'创建日期',data:item.transactionTime},
      {label:'分销商名称',data:item.traderName},
      {label:'联系电话',data:item.traderContactPhone},
      {label:'经办人',data:item.transactionBy},
      {label:'收货人',data:item.traderContactName},
      {label:'收货地址',data:item.deliveredAddress},
      {label:'备注',data:item.salesNote},
      {label: '关联产品',data: item.outItems,
        columns:[
          {title: '商品条码',value: 'skuCode'},
          {title: '商品编号',value: 'skuBarcode'},
          {title: '商品名称',value: 'skuName'},
          {title: '需求数量',value: 'transactionQuantities'},
          {title: '销售单价',value: 'transactionSkuPrice'},
          {title: '销售总价',value: 'totalMoney'},
        ]
      }
    ]
  }

  let saleTotal = 0;
  item && item.outItems && item.outItems.length > 0 && item.outItems.map((item,index) => {
    saleTotal += ((item.transactionQuantities || 0) * (item.transactionSkuPrice || 0))
  })

  return (
    <div>
      <FormIemView {...formItemProps}>
        <div>
         销售总额：￥{saleTotal}
        </div>
     </FormIemView>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(DistributorOutView);
