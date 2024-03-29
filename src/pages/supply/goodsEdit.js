import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import GoodsForm from './component/GoodsForm'

const InventoryEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const goodsFormProps = {
    item,
    title: '编辑商品',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/updateGoods',
        payload: data
      })
    }
  }

  return (
    <div>
      <GoodsForm {...goodsFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(InventoryEdit)
