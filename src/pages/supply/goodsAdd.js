import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import GoodsForm from './component/GoodsForm';

const InventoryAdd = ({ dispatch,supply }) => {

    const goodsFormProps = {
        title: '添加商品',
        onBack() {
            dispatch(routerRedux.goBack())
        },
        onSave(data) {
            dispatch({
                type: 'supply/addGoods',
                payload: data
            })
        }
    }

    return(
        <div>
          <GoodsForm {...goodsFormProps}/>
        </div>
    )

}

function mapPropsToState(state) {
    return {
        supply: state.supply
    }
}

export default connect(mapPropsToState)(InventoryAdd)