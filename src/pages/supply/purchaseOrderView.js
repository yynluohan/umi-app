import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const PurchaseOrderView = ({ supply }) => {

  const { item } = supply;

  const statusMap = {
    'xxx':'等待入库',
    'SectionStorageIn':'部分入库',
    'TotalStorageIn':'全部入库',
    'Draft':'草稿',
    'Wait_To_Audit':'待审核',
    'Audit_Passed':'审核通过',
    'Closed':'已关闭',
  }

  const formItemProps = {
    title: '采购订单详情',
    list: [
      {label:'采购单编号',data: item.procurementCode},
      {label:'供应商',data:item.supplierName},
      {label:'总花费',data:item.procurementTotal},
      {label:'采购时间',data:item.procurementTime},
      {label:'状态',data:statusMap[item.procureStatus]},
      {label: '关联产品',data: item.items,
        columns:[
          {title: '商品条码',value: 'barCode'},
          {title: '采购时间',value: 'createTime'},
          {title: '商品编号',value: 'skuCode'},
          {title: '商品名称',value: 'skuName'},
          {title: '采购数量',value: 'transactionQuantities'},
          {title: '采购单价',value: 'transactionSkuPrice'},
          {title: '采购总价',value: 'transactionAllMoney'},
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

export default connect(mapStateToProps)(PurchaseOrderView);
