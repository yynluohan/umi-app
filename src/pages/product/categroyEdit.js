import React from 'react'
import { connect } from 'dva'
import AddCategroyForm from './component/AddCategroyForm'
import { routerRedux } from 'dva/router'

class categroyEdit extends React.Component {
  render () {
    const { item } = this.props.product

    const _this = this

    const addCategroyFormProps = {
      item,
      title: '修改产品类别',
      onBack () {
        _this.props.dispatch(routerRedux.goBack())
      },
      onSave (data) {
        _this.props.dispatch({
          type: 'product/updateCategroy',
          payload: data
        })
      }
    }

    return (
      <div>
        <AddCategroyForm {...addCategroyFormProps} />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(categroyEdit)
