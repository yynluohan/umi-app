import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import printConfig from './config/printConfig'

const Print = ({ dispatch, config }) => {
  return (
    <div>
      <ZEle namespace='config' config={printConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Print)
