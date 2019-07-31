import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import freightConfig from './config/freightConfig.js';

class Freight extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='product' config={freightConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Freight);
