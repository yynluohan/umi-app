import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import trialConfig from './config/trialConfig.js';

class Trial extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='product' config={trialConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Trial);
