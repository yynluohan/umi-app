import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import goodsConfig from './config/goodsConfig';

const Goods = ({ dispatch,config }) => {

  return (
    <div>
      <ZEle namespace='config'  config={goodsConfig} />
    </div>
  )

}

function mapStateToProps(state) {
  return {
    config: state.config
  }
}

export default connect(mapStateToProps)(Goods);
