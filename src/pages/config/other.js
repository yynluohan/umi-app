import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import otherConfig from './config/otherConfig'

const Other = ({ dispatch, config }) => {
  return (
    <div>
      <ZEle namespace='config' config={otherConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Other)
