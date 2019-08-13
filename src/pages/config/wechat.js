import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import wechatConfig from './config/wechatConfig';

const Wechat = ({ dispatch,config }) => {

  return (
    <div>
      <ZEle namespace='config'  config={wechatConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Wechat);
