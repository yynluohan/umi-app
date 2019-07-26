import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import tagConfig from './config/tagConfig.js';

class Tag extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='product' config={tagConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(Tag);
