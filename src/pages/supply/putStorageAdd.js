import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PutStorageForm from './component/PutStorageForm';

const PutStorageAdd = ({ dispatch }) => {

    const putStorageFormProps = {
        title: '添加入库信息',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addPutStorage',
                payload: data
            })
        }
    }

    return(
        <div>
          <PutStorageForm {...putStorageFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(PutStorageAdd)