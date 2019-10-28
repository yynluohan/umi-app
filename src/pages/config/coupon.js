import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import couponConfig from './config/couponConfig'

const Coupon = ({ dispatch, config }) => {
  return (
    <div>
      <ZEle namespace='config' config={couponConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Coupon)
