import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import evaluateConfig from './config/evaluateConfig.js'

class Evaluate extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='product' config={evaluateConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Evaluate)
