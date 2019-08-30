import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DistributorOutForm from './component/DistributorOutForm';

const DistributorOutEdit = ({ dispatch,supply }) => {

    const { item } = supply;

    const distributorOutFormProps = {
        item,
        title: '编辑分销订单',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data,statusData) {
            if (statusData) {
                dispatch({
                    type: 'supply/submitApproveDistributorOut',
                    payload: data
                })
            } else {
                dispatch({
                    type: 'supply/updateDistributorOut',
                    payload: data
                })
            }
            
        }
    }

    return(
        <div>
          <DistributorOutForm {...distributorOutFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(DistributorOutEdit)