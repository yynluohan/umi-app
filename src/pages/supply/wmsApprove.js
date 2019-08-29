import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WmsApproveForm from './component/WmsApproveForm';

const WmsApprove = ({ dispatch,supply }) => {

    const { item } = supply;

    const wmsApproveFormProps = {
        item,
        title: '审核',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data,statusData) {
            if (statusData === '拒绝') {
              dispatch({
                  type: 'supply/purchaseReturnApproveReject'
              })
            } else {
                dispatch({
                    type: 'supply/purchaseReturnApprovePass',
                    payload: data
                })
            }
        }
    }

    return(
        <div>
          <WmsApproveForm {...wmsApproveFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(WmsApprove)