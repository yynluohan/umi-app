import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import goodsCategroyConfig from './config/goodsCategroyConfig.js';

class GoodsCategroy extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={goodsCategroyConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(GoodsCategroy);
