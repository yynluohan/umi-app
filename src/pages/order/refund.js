import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import refundConfig from './config/refundConfig.js';

class Refund extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='order' config={refundConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(Refund);
