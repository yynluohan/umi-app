import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import DistributorOutForm from './component/DistributorOutForm'

const DistributorOutAdd = ({ dispatch }) => {
  const distributorOutFormProps = {
    title: '添加分销订单',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/addDistributorOut',
        payload: data
      })
    }
  }

  return (
    <div>
      <DistributorOutForm {...distributorOutFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(DistributorOutAdd)
