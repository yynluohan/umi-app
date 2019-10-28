import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import AddInforForm from './component/AddInforForm'

const AddInfo = ({ dispatch }) => {
  const addInfoFormProps = {
    title: '添加资讯',
    onBack () {
      dispatch(routerRedux.goBack())
    },
    onSave (data) {
      dispatch({
        type: 'information/addInforData',
        payload: data
      })
    }
  }

  return (
    <div>
      <AddInforForm {...addInfoFormProps} />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    information: state.information
  }
}

export default connect(mapStateToProps)(AddInfo)
