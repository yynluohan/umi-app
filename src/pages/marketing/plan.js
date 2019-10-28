import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import planConfig from './config/planConfig.js'

const Plan = () => {
  return (
    <div>
      <ZEle namespace='marketing' config={planConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    marketing: state.marketing
  }
}

export default connect(mapStateToProps)(Plan)
