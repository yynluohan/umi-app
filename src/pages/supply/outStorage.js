import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import outStorageConfig from './config/outStorageConfig.js';

class OutStorage extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='supply'  config={outStorageConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(OutStorage);
