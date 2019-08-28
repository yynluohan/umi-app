import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import distributorConfig from './config/distributorConfig.js';

class Distributor extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={distributorConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Distributor);
