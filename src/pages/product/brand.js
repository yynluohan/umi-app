import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import brandConfig from './config/brandConfig.js'

class Brand extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='product' config={brandConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Brand)
