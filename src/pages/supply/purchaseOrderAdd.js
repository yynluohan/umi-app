import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import PurchaseOrderForm from './component/PurchaseOrderForm'

const PurchaseOrderAdd = ({ dispatch }) => {
  const purchaseOrderFormProps = {
    title: '添加采购订单',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/addPurchaseOrder',
        payload: data
      })
    }
  }

  return (
    <div>
      <PurchaseOrderForm {...purchaseOrderFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(PurchaseOrderAdd)
