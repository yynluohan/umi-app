import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import InventoryForm from './component/InventoryForm'

const InventoryEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const inventoryFormProps = {
    item,
    title: '编辑库存盘点',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/updateInventory',
        payload: data
      })
    }
  }

  return (
    <div>
      <InventoryForm {...inventoryFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(InventoryEdit)
