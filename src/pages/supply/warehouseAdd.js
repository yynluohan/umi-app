import { connect } from 'dva'
import WarehoseForm from './component/WarehoseForm'
import { routerRedux } from 'dva/router'

const WarehouseAdd = ({ dispatch }) => {
  const formProps = {
    title: '添加仓库',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'supply/addWarehouse',
        payload: data
      })
    }
  }

  return (
    <WarehoseForm {...formProps} />
  )
}

function mapStateToProps (state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(WarehouseAdd)
