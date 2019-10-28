import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import InventoryForm from './component/InventoryForm'

const InventoryAdd = ({ dispatch }) => {
  const inventoryFormProps = {
    title: '添加库存盘点',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/addInventory',
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

export default connect(mapPropsToState)(InventoryAdd)
