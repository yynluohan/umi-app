import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import distributorOutConfig from './config/distributorOutConfig.js'

const DistributorOut = () => {
  return (
    <div>
      <ZEle namespace='supply' config={distributorOutConfig} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(DistributorOut)
