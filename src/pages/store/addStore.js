import { connect } from 'dva';
import AddStoreForm from './component/AddStoreForm';
import { routerRedux } from 'dva/router';

const AddStore = ({ dispatch,store }) => {

  const addStoreFormProps = {
    title:'添加门店',
    onBack(){
      dispatch(routerRedux.goBack())
    }
  }

  return (
    <div>
      <AddStoreForm {...addStoreFormProps}/>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    store: state.store
  }
}

export default connect(mapStateToProps)(AddStore)
