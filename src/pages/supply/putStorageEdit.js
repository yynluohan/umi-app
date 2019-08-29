import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import PutStorageForm from './component/PutStorageForm';

const PutStorageEdit = ({ dispatch,supply }) => {

    const { item } = supply;

    const putStorageFormProps = {
        item,
        title: '编辑入库信息',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data,statusData) {
            if (statusData) {
                dispatch({
                    type: 'supply/submitApprovePutStorage',
                    payload: data
                })
            } else {
                dispatch({
                    type: 'supply/updatePutStorage',
                    payload: data
                })
            }
            
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

export default connect(mapPropsToState)(PutStorageEdit)