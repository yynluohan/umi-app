import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import noticeEditConfig from './config/noticeEditConfig.js';

const NoticeEdit = ({ dispatch,notice }) => {
  return (
    <div>
      <ZEle namespace='notice'  config={noticeEditConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(NoticeEdit);
