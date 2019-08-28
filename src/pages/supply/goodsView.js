import React from 'react';
import { connect } from 'dva';
import FormIemView from '../../common/FormIemView'

const GoodsView = ({ dispatch,supply }) => {

  const { item } = supply;

  const formItemProps = {
    title: '商品详情',
    list: [
      {label:'商品编号',data: item.productCode},
      {label:'商品分类',data:item.productCategoryId},
      {label:'条形码',data:item.barCode},
      {label:'商品名称',data:item.name},
      {label:'单位',data:item.field1},
      {label:'参考成本价格',data:item.costPrice},
      {label:'商品规格',data:item.spec},
      {label:'商品体积',data:item.costPrice},
      {label:'参考成本价格',data:item.costPrice},
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

export default connect(mapStateToProps)(GoodsView);
