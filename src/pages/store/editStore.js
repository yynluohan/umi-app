import { connect } from 'dva'
import AddStoreForm from './component/AddStoreForm'
import { routerRedux } from 'dva/router'

const EditStore = ({ dispatch, store }) => {
  const { item } = store

  item.images && item.images.length > 0 && item.images.map((k, i) => {
    item.images[i] = {
      ...k,
      status: 'done',
      uid: i
    }
  })

  const addStoreFormProps = {
    item,
    title: '修改门店',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'store/updateStore',
        payload: data
      })
    }
  }

  return (
    <div>
      <AddStoreForm {...addStoreFormProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    store: state.store
  }
}

export default connect(mapStateToProps)(EditStore)
