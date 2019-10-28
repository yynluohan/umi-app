import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import purchaseOrdeConfig from './config/purchaseOrdeConfig.js'

const PurchaseOrder = () => {
  return (
    <div>
      <ZEle namespace='supply' config={purchaseOrdeConfig} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(PurchaseOrder)
