import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import warehouseConfig from './config/warehouseConfig.js';

class Warehouse extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={warehouseConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Warehouse);
