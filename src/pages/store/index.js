import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import storeConfig from './config/storeConfig.js';

class Store extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='store'  config={storeConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    store: state.store
  }
}

export default connect(mapStateToProps)(Store);
