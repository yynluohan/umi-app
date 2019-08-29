import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import noticeAddConfig from './config/noticeAddConfig.js';

const NoticeAdd = () => {
  return (
    <div>
      <ZEle namespace='notice'  config={noticeAddConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(NoticeAdd);
