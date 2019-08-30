import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PurchaseReturnForm from './component/PurchaseReturnForm';

const PurchaseReturnAdd = ({ dispatch }) => {

    const purchaseReturnFormProps = {
        title: '添加采购退货',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addPurchaseReturn',
                payload: data
            })
        }
    }

    return(
        <div>
          <PurchaseReturnForm {...purchaseReturnFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(PurchaseReturnAdd)