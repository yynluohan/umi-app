import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const InventoryView = ({ supply }) => {

  const { item } = supply;

  const formItemProps = {
    title: '库存盘点详情',
    list: [
      {label:'盘点单编号',data: item.checkCode},
      {label:'仓库',data:item.warehouseName},
      {label:'经办人',data:item.transactionBy},
      {label:'制单人',data:item.originatorName},
      {label:'盘点时间',data:item.checkTime},
      {label:'备注',data:item.checkNote},
      {label: '关联产品',data: item.skuRecords,
        columns:[
          {title: '商品条码',value: 'skuBarcode'},
          {title: '商品编号',value: 'skuCode'},
          {title: '商品名称',value: 'skuName'},
          {title: '需求数量',value: 'deservedQuantities'},
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

export default connect(mapStateToProps)(InventoryView);
