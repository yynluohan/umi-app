import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TransferForm from './component/TransferForm';

const TransferAdd = ({ dispatch,supply }) => {

    const transferFormProps = {
        title: '添加库存调拨',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addTransfer',
                payload: data
            })
        }
    }

    return(
        <div>
          <TransferForm {...transferFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(TransferAdd)