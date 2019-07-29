import React from 'react';
import { connect } from 'dva';
import ZEle from 'zero-element';
import { routerRedux } from 'dva/router';
import FormIemView from '../../common/FormIemView'

class categroyView extends React.Component {

  render() {

    const { item } = this.props.product;

    const imgStyle = {
      backgroundImage: `url(${item.cover})`,
      width:'100px',
      height:'100px',
      // borderRadius: '50%',
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat:'no-repeat'
    }

    const formItemProps = {
      title: '产品类型详情',
      list: [
        {label:'名称',data: item.name},
        {label:'父类别',data:item.parentId},
        {label:'首页展示',data:item.isShowProducts == '1' ? '是' : '否'},
        {label:'销售类别',data:item.wholesale},
        {label:'点击类别显示产品详情',data:item.visible == '1' ? '是' : '否'},
        {label:'首页推荐产品数量',data:item.promotedProductCount},
        {label:'排序号',data:item.sortOrder},
        {label:'封面',data:(<div style={imgStyle}></div>)},
        {label: '描述',data: item.description}
      ]
    }

    return (
      <div>
        <FormIemView {...formItemProps}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps)(categroyView);
