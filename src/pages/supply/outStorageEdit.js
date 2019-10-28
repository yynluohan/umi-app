import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import OutStorageForm from './component/OutStorageForm'

const OutStorageEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const outStorageFormProps = {
    item,
    title: '编辑出库信息',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data, statusData) {
      if (statusData) {
        dispatch({
          type: 'supply/submitApproveOutStorage',
          payload: data
        })
      } else {
        dispatch({
          type: 'supply/updateOutStorage',
          payload: data
        })
      }
    }
  }

  return (
    <div>
      <OutStorageForm {...outStorageFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(OutStorageEdit)
