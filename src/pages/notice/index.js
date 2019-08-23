import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import noticeConfig from './config/noticeConfig.js';

const Notice = ({ dispatch,notice }) => {
  return (
    <div>
      <ZEle namespace='notice'  config={noticeConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(Notice);
