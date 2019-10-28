import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import SupplierForm from './component/SupplierForm'

const SupplierEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const supplierFormProps = {
    item,
    title: '编辑供应商',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/updateSupplier',
        payload: data
      })
    }
  }

  return (
    <div>
      <SupplierForm {...supplierFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(SupplierEdit)
