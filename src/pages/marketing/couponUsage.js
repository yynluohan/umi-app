import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import couponUsageConfig from './config/couponUsageConfig.js';

const CouponUsage = ({ dispatch,marketing }) => {
  return (
    <div>
      <ZEle namespace='marketing'  config={couponUsageConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    marketing: state.marketing
  }
}

export default connect(mapStateToProps)(CouponUsage);
