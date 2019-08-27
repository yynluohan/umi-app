import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import transferConfig from './config/transferConfig.js';

class Transfer extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={transferConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Transfer);
