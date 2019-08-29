import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const OutStorageView = ({ supply }) => {

  const { item } = supply;

  const formItemProps = {
    title: '入库详情',
    list: [
      {label:'出库编号',data: item.transactionCode},
      {label:'仓库',data: item.warehouseName},
      {label:'经办人',data:item.transactionBy},
      {label:'制单人',data:item.originatorName},
      {label:'出库日期',data:item.storageOutTime},
      {label: '订单号信息',data:item.outOrderNum},
      {label: '客户',data:item.distributorCustomer},
      {label:'备注',data:item.note},
      {label: '入库产品',data: item.storageOutItems,
        columns:[
          {title: '商品条码',value: 'barCode'},
          {title: '商品编号',value: 'skuCode'},
          {title: '商品名称',value: 'skuName'},
          {title: '出库数量',value: 'transactionQuantities'},
          {title: '商品价格',value: 'transactionSkuPrice'},
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

export default connect(mapStateToProps)(OutStorageView);
