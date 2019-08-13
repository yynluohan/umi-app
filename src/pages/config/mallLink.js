import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import mallLinkConfig from './config/mallLinkConfig';

const MallLink = ({ dispatch,config }) => {

  return (
    <div>
      <ZEle namespace='config'  config={mallLinkConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(MallLink);
