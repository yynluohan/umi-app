import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import AddProductForm from './component/AddProductForm';
import { routerRedux } from 'dva/router';

const ProductEdit = ({ dispatch,product }) => {


  const { item } = product;

  const formProps = {
    item,
    title: '修改产品类别',
    onBack() {
      dispatch(routerRedux.goBack())
    },
    onSave(data) {
      dispatch({
        type: 'product/updateProduct',
        payload: data
      })
    }
  }

  return (
    <div>
      <AddProductForm {...formProps}/>
    </div>
  )

}


function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(ProductEdit);
