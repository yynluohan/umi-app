import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import mallConfig from './config/mallConfig'

const Mall = ({ dispatch, config }) => {
  return (
    <div>
      <ZEle namespace='config' config={mallConfig} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Mall)
