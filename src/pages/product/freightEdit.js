import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddFreightForm from './component/AddFreightForm'

const FreightEdit = ({ dispatch,product  }) => {

  const { item } = product;

  const addFreightFormProps = {
    item,
    title: '编辑运费模板',
    onBack(){
      dispatch(routerRedux.goBack())
    },
    onSave(data) {
      dispatch({
        type: 'product/updateFreight',
        payload: data
      })
    }
  }

  return (
    <div>
      <AddFreightForm {...addFreightFormProps}/>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(FreightEdit);
