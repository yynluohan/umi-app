import React from 'react'
import { connect } from 'dva'
import FormIemView from '../../common/FormIemView'

const TransferView = ({ supply }) => {
  const { item } = supply

  const formItemProps = {
    title: '调拨详情',
    list: [
      { label: '调出仓库', data: item.fromWarehouseName },
      { label: '调出时间', data: item.transactionTime },
      { label: '调入仓库', data: item.toWarehouseName },
      { label: '调入时间', data: item.finishTime },
      { label: '经办人', data: item.transactionBy },
      { label: '制单人', data: item.originatorName },
      { label: '备注', data: item.note },
      {
        label: '入库产品',
        data: item.outItems,
        columns: [
          { title: '商品条码', value: 'skuBarcode' },
          { title: '商品编号', value: 'skuCode' },
          { title: '商品名称', value: 'skuName' },
          { title: '需求数量', value: 'transactionQuantities' },
          { title: '单位', value: 'field1' }
        ]
      }
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(TransferView)
