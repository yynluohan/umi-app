import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import setExpressConfig from './config/setExpressConfig.js'

class SetExpress extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='order' config={setExpressConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(SetExpress)
