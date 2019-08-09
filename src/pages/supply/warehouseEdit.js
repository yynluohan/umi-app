import { connect } from 'dva';
import WarehoseForm from './component/WarehoseForm';
import { routerRedux } from 'dva/router';

const WarehouseEdit = ({ dispatch,supply }) => {

  const { item } = supply;

  const formProps = {
    item,
    title: '编辑仓库',
    onBack() {
      dispatch(routerRedux.goBack())  
    },
    onSave(data) {
      dispatch({
        type: 'supply/updateWarehouse',
        payload:data
      })
    }
  }

  return (
    <WarehoseForm {...formProps}/>
  )

}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(WarehouseEdit)
