import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import userConfig from './config/userConfig.js';

const User = ({ dispatch,sys }) => {
  return (
    <div>
      <ZEle namespace='sys'  config={userConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(User);
