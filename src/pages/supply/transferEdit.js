import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import TransferForm from './component/TransferForm';

const TransferEdit = ({ dispatch,supply }) => {

    const { item } = supply;

    const transferFormProps = {
        item,
        title: '编辑库存调拨',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/updateTransfer',
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

export default connect(mapPropsToState)(TransferEdit)