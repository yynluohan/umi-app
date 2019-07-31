import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AddFreightForm from './component/AddFreightForm'

const FreightAdd = ({ dispatch,product  }) => {


  const addFreightFormProps = {
    title: '添加运费模板',
    onBack(){
      dispatch(routerRedux.goBack())
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

export default connect(mapStateToProps)(FreightAdd);
