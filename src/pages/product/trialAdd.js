import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import AddTrialForm from './component/AddTrialForm'

const TrialAdd = ({ dispatch }) => {
  const addFormProps = {
    title: '添加试用装',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'product/addTrial',
        payload: data
      })
    }
  }

  return (
    <div>
      <AddTrialForm {...addFormProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(TrialAdd)
