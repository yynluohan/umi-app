import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const WarehouseView = ({ supply }) => {

  const { item } = supply;

  const formItemProps = {
    title: '仓库详情',
    list: [
      {label:'仓库编号',data: item.warehouseCode},
      {label:'仓库名称',data:item.warehouseName},
      {label:'所在省市',data:item.warehousePCD},
      {label:'详细地址',data:item.warehouseAddress},
    ]
  }

  return (
    <div>
      <FormIemView {...formItemProps}/>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    supply: state.supply
  }
}

export default connect(mapStateToProps)(WarehouseView);
