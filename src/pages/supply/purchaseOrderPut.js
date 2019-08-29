import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PurchaseOrderPutForm from './component/PurchaseOrderPutForm';

const PurchaseOrderPut = ({ dispatch,supply }) => {

    const { item } = supply

    const purchaseOrderPutFormProps = {
        item,
        title: '商品入库',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addPurchaseOrderPut',
                payload: data
            })
        }
    }

    return(
        <div>
          <PurchaseOrderPutForm {...purchaseOrderPutFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(PurchaseOrderPut)