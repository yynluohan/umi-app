import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import DistributorForm from './component/DistributorForm'

const DistributorEdit = ({ dispatch, supply }) => {
  const { item } = supply

  const distributorFormProps = {
    item,
    title: '编辑分销商',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/updateDistributor',
        payload: data
      })
    }
  }

  return (
    <div>
      <DistributorForm {...distributorFormProps} />
    </div>
  )
}

function mapPropsToState (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapPropsToState)(DistributorEdit)
