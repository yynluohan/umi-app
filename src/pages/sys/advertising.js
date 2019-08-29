import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import advertisingConfig from './config/advertisingConfig.js';

const Advertising = () => {

  return (
    <div>
      <ZEle namespace='sys'  config={advertisingConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(Advertising);
