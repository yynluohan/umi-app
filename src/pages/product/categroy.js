import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import categroyConfig from './config/categroyConfig.js'

class Categroy extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='product' config={categroyConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Categroy)
