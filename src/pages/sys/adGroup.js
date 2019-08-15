import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import adGroupConfig from './config/adGroupConfig.js';

const AdGroup = ({ dispatch,sys }) => {
  return (
    <div>
      <ZEle namespace='sys'  config={adGroupConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(AdGroup);
