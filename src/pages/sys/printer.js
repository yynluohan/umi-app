import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import printerConfig from './config/printerConfig.js';

const Printer = ({ dispatch,sys }) => {
  return (
    <div>
      <ZEle namespace='sys'  config={printerConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(Printer);
