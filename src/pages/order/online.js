import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import onlineConfig from './config/onlineConfig.js';

class Online extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='order' config={onlineConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(Online);
