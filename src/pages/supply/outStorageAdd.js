import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import OutStorageForm from './component/OutStorageForm';

const OutStorageAdd = ({ dispatch }) => {

    const outStorageFormProps = {
        title: '添加出库信息',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addOutStorage',
                payload: data
            })
        }
    }

    return(
        <div>
          <OutStorageForm {...outStorageFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(OutStorageAdd)