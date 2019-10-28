import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import offlineConfig from './config/offlineConfig.js'

class Offline extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='order' config={offlineConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(Offline)
