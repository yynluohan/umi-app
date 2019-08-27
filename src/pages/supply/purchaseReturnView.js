import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const PurchaseReturnView = ({ dispatch,supply }) => {

  const { item } = supply;

  const statusMap = {
    'Done':'完成',
    'Draft':'草稿',
    'Wait_To_Audit':'待审核',
    'Audit_Passed':'审核通过',
    'Closed':'关闭',
  }

  const formItemProps = {
    title: '采购退货详情',
    list: [
      {label:'退货编号',data: item.productRefundCode},
      {label:'仓库',data: item.warehouseName},
      {label:'经办人',data:item.originatorName},
      {label:'制单人',data:item.transactionBy},
      {label:'关联的采购单',data:item.procurementCode},
      {label:'产生的出库单',data:item.field1},
      {label:'退货时间',data:item.productRefundTime},
      {label:'退货数量',data:item.productRefundQuantities},
      {label:'退货状态',data:statusMap[item.productRefundStatus]},
      {label:'交易时间',data:item.transactionTime},
      {label:'备注',data:item.productRefundNote},
      {label:'供应商',data:item.supplierName},
      {label: '关联产品',data: item.items,
        columns:[
          {title: '商品条码',value: 'barCode'},
          {title: '商品编号',value: 'skuCode'},
          {title: '商品名称',value: 'skuName'},
          {title: '退货数量',value: 'transactionQuantities'},
          {title: '退货单价',value: 'transactionSkuPrice'},
          {title: '退货总价',value: 'transactionAllMoney'},
          {title: '单位',value: 'field1'},
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
    supply: state.supply
  }
}

export default connect(mapStateToProps)(PurchaseReturnView);
