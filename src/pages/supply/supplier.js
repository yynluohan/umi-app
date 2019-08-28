import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import supplierConfig from './config/supplierConfig.js';

class Supplier extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={supplierConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Supplier);
