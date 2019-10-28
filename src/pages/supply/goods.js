import React from 'react'
import { connect } from 'dva'
import ZEle from 'zero-element'
import goodsConfig from './config/goodsConfig.js'

class Goods extends React.Component {
  render () {
    return (
      <div>
        <ZEle namespace='supply' config={goodsConfig} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Goods)
