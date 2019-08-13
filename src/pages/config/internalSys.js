import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import internalSysConfig from './config/internalSysConfig';

const InternalSys = ({ dispatch,config }) => {

  return (
    <div>
      <ZEle namespace='config'  config={internalSysConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(InternalSys);
