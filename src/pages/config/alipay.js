import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import aliplyConfig from './config/aliplyConfig';

const Alipay = ({ dispatch,config }) => {

  return (
    <div>
      <ZEle namespace='config'  config={aliplyConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Alipay);
