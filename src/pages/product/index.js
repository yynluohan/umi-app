import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import productConfig from './config/productConfig.js'

class Product extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='product' config={productConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Product)
