import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import inventoryConfig from './config/inventoryConfig.js';

class Inventory extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={inventoryConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(Inventory);
