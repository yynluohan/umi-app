import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import purchaseReturnConfig from './config/purchaseReturnConfig.js';

const PurchaseReturn = ({ dispatch,supply }) => {


    return(
        <div>
          <ZEle namespace='supply'  config={purchaseReturnConfig} />
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(PurchaseReturn)