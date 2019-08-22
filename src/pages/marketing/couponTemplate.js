import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import couponTemplateConfig from './config/couponTemplateConfig.js';

const CouponTemplate = ({ dispatch,marketing }) => {

  return (
    <div>
      <ZEle namespace='marketing'  config={couponTemplateConfig} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    marketing: state.marketing
  }
}

export default connect(mapStateToProps)(CouponTemplate);
