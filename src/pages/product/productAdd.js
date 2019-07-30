import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddProductForm from './component/AddProductForm'

const ProductAdd = ({ dispatch,product }) => {


  const addFormProps = {
    title: '添加产品',
    onBack() {
      dispatch(routerRedux.goBack())
    },
    onSave(data) {
      dispatch({
        type: 'product/addProduct',
        payload:data
      })
    }
  }

  return (
    <div>
      <AddProductForm {...addFormProps}/>
    </div>
  )

}


function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(ProductAdd)
