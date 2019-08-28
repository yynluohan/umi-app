import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import informationConfig from './config/informationConfig.js';

class Infomation extends React.Component {

  render() {

    return (
      <div>
        <ZEle namespace='information'  config={informationConfig} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    information: state.information
  }
}

export default connect(mapStateToProps)(Infomation);
