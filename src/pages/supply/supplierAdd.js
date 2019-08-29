import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SupplierForm from './component/SupplierForm';

const SupplierAdd = ({ dispatch }) => {

    const supplierFormProps = {
        title: '添加供应商',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addSupplier',
                payload: data
            })
        }
    }

    return(
        <div>
          <SupplierForm {...supplierFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(SupplierAdd)