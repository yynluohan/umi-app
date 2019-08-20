import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import wechatTemplateConfig from './config/wechatTemplateConfig.js';

const WechatTemplate = ({ dispatch,sys }) => {
  return (
    <div>
      <ZEle namespace='sys'  config={wechatTemplateConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    sys: state.sys
  }
}

export default connect(mapStateToProps)(WechatTemplate);
