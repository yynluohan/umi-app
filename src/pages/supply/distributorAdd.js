import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DistributorForm from './component/DistributorForm';

const DistributorAdd = ({ dispatch }) => {

    const distributorFormProps = {
        title: '添加分销商',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addDistributor',
                payload: data
            })
        }
    }

    return(
        <div>
          <DistributorForm {...distributorFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(DistributorAdd)