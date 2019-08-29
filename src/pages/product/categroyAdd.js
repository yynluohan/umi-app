import React from 'react';
import { connect } from 'dva';
import AddCategroyForm from './component/AddCategroyForm';
import { routerRedux } from 'dva/router';

class CategroyAdd extends React.Component {

  render() {

    const _this = this;

    const addCategroyFormProps = {
      title: '添加产品类别',
      onBack() {
        _this.props.dispatch(routerRedux.goBack())
      },
      onSave(data) {
        _this.props.dispatch({
          type: 'product/addCategroy',
          payload:data
        })
      }
    }

    return (
      <div>
        {/*<ZEle namespace='product' config={categroyAddConfig} />*/}
        <AddCategroyForm {...addCategroyFormProps}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(CategroyAdd);
