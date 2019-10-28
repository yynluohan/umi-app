import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import PurchaseReturnForm from './component/PurchaseReturnForm'

const PurchaseReturnEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const purchaseReturnFormProps = {
    item,
    title: '编辑采购退货',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data, statusData) {
      if (statusData) {
        dispatch({
          type: 'supply/submitApprovePurchaseReturn',
          payload: data
        })
      } else {
        dispatch({
          type: 'supply/updatePurchaseReturn',
          payload: data
        })
      }
    }
  }

  return (
    <div>
      <PurchaseReturnForm {...purchaseReturnFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(PurchaseReturnEdit)
