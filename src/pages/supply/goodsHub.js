import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import goodsHubConfig from './config/goodsHubConfig.js';

class GoodsHub extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={goodsHubConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(GoodsHub);
