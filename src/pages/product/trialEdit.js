import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddTrialForm from './component/AddTrialForm'

const TrialEdit = ({ dispatch,product }) => {

  const { item } = product;

  const addFormProps = {
    item,
    title: '修改试用装',
    onBack() {
      dispatch(routerRedux.goBack())
    },
    onSave(data) {
      dispatch({
        type: 'product/updateTrial',
        payload:data
      })
    }
  }

  return (
    <div>
      <AddTrialForm {...addFormProps}/>
    </div>
  )

}


function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(TrialEdit)
